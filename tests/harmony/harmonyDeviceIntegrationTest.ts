import { HarmonyDevice } from '../../src/harmony/harmonyDevice';

describe('HarmonyDevice', () => {
    const HUB_HOST = '192.168.86.28';
    const HUB_REMOTE_ID = '16313807';
    const LED_DEVICE_ID = '69617402';

    var fixture: HarmonyDevice;
    beforeAll(() => {
        fixture = new HarmonyDevice(HUB_HOST, HUB_REMOTE_ID, LED_DEVICE_ID);
    });

    afterAll(() => {
        fixture.disconnect();
    });

    it('should list commands properly', async () => {
        var commands = await fixture.listCommands();
        expect(commands).toBeDefined();
        expect(commands.length > 0).toBeTruthy();
        commands.forEach((c) => console.log(`Command: [${c}]`));
    });

    it('should ping the hub', async () => {
        var ping = await fixture.ping();
        expect(ping).toBeDefined();
        console.log(JSON.stringify(ping));

        fixture.disconnect();
        fixture.reconnect();
        ping = await fixture.ping();
        expect(ping).toBeDefined();
        console.log(JSON.stringify(ping));
    });

    it('should have PowerToggle command', async () => {
        var hasCommand = await fixture.hasCommand('PowerToggle');
        expect(hasCommand).toBe(true);
    })

    it('should not have PowerUnToggle command', async () => {
        var hasCommand = await fixture.hasCommand('PowerUnToggle');
        expect(hasCommand).toBe(false);
    })

    it('should send a command', async () => {
        var cmd = 'BrightnessUp';
        await fixture.sendCommand(cmd);
    });
});