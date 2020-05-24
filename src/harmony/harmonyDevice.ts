import { HarmonyHub,  } from 'harmonyhub-api';
import { logger, Disposable } from '../util'

export class HarmonyDevice implements Disposable {
    private host: string;
    private remoteId: string;
    private deviceId: string;
    private hub: HarmonyHub;
    private config: any;
    private ready: Promise<any>;
    private pingInterval: NodeJS.Timeout = null;

    constructor(host: string, remoteId: string, deviceId: string) {
        this.host = host;
        this.remoteId = remoteId;
        this.deviceId = deviceId;

        this.hub = new HarmonyHub(this.host, this.remoteId);
        this._reconnect();
    }

    private _reconnect(): void {
        try {
            logger.info('Disconnecting hub, just in case...');
            if(this.pingInterval) {
                clearInterval(this.pingInterval);
                this.pingInterval = null;
            }
            this.hub.disconnect();
        } catch(e) {
            logger.warn(`Error disconnecting hub - ignoring: ${JSON.stringify(e)}`);
        }

        this.ready = new Promise((resolve, reject) => {
            logger.info(`Connecting to hub at ${this.host}, remote ${this.remoteId}, device ${this.deviceId}`);
            this.hub.connect().then((config) => {
                logger.info('Connected to hub');
                this.config = config;
                this.pingInterval = setInterval(async () => {
                    logger.debug('Pinging hub');
                    try {
                        await this.hub.ping();
                    } catch(e) {
                        logger.error(`Error pinging hub: ${JSON.stringify(e)}`);
                    }
                }, 30000);
                this.hub.on('close', (event) => {
                    logger.info(`Close Event: code=[${event.code}], description=[${event.desc}]`);
                });
                this.hub.on('error', (event) => {
                    logger.error(`Error Event: ${JSON.stringify(event)}`);
                    if (event.code === "ECONNRESET") {
                        logger.info("Reconnecting after ECONNRESET error event");
                        this._reconnect();
                    }
                });                
                resolve(undefined);
            }, (reason) => {
                reject(reason);
            });
        });
    }

    private getDevice(): any {
        return this.config.device.find(d => d.id == this.deviceId);
    }

    public async listCommands(): Promise<Array<any>> {
        return this.ready.then(() => {
            var device = this.getDevice();
            var commands = [].concat.apply([], [device.controlGroup.map(g => g.function)]).reduce((accum, val) => accum.concat(val), []).map(c => c.name).sort();
            return commands;
        });
    }

    public async hasCommand(cmd: string): Promise<boolean> {
        var found = await this.findCommand(cmd);
        return Promise.resolve(found !== null && found !== undefined);
    }

    private async findCommand(cmd: string): Promise<string> {
        var found = (await this.listCommands()).find((c) => c.toLowerCase() == cmd.toLowerCase());
        return Promise.resolve(found);
    }

    public async sendCommand(cmd: string): Promise<void> {
        return this.ready.then(async () => {
            var cmdToSend = await this.findCommand(cmd);
            this.hub.sendCommand(cmdToSend, this.deviceId, 'press');
        });
    }

    public async ping(): Promise<any> {
        return this.ready.then(async () => {
            return await this.hub.ping();
        });
    }

    public async refreshConfig(): Promise<any> {
        this.ready.then(async () => {
            this.config = await this.hub.loadConfig();
        });
    }

    public disconnect(): void {
        this.hub.disconnect();
        if(this.pingInterval) {
            clearInterval(this.pingInterval);
        }
        this.pingInterval = null;
    }

    public async reconnect(): Promise<any> {
        this._reconnect();
        return this.ready;
    }

    public dispose(): void {
        this.disconnect();
    }
}