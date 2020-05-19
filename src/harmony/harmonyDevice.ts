import { HarmonyHub,  } from 'harmonyhub-api';

export class HarmonyDevice {
    private host: string;
    private remoteId: string;
    private deviceId: string;
    private hub: HarmonyHub;
    private config: any;
    private ready: Promise<any>;

    constructor(host: string, remoteId: string, deviceId: string) {
        this.host = host;
        this.remoteId = remoteId;
        this.deviceId = deviceId;

        this.hub = new HarmonyHub(this.host, this.remoteId);
        this._reconnect();
    }

    private _reconnect(): void {
        try {
            this.hub.disconnect();
        } catch(e) {
            // Nothing
        }

        this.ready = new Promise((resolve, reject) => {
            this.hub.connect().then((config) => {
                this.config = config;
                resolve(undefined);
            }, (reason) => {
                reject(reason);
            });
        });
    }

    public async listCommands(): Promise<Array<any>> {
        return this.ready.then(() => {
            var device = this.config.device.find(d => d.id == this.deviceId);
            var commands = [].concat.apply([], [device.controlGroup.map(g => g.function)]).reduce((accum, val) => accum.concat(val), []).map(c => c.name).sort();
            return commands;
        });
    }

    public async sendCommand(cmd: string): Promise<void> {
        return this.ready.then(() => {
            this.hub.sendCommand(cmd, this.deviceId, 'press');
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
    }

    public async reconnect(): Promise<any> {
        this._reconnect();
        return this.ready;
    }
}