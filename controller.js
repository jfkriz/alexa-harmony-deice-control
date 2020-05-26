const HarmonyHub = require('harmonyhub-api').HarmonyHub;
const HUB_HOST = '192.168.86.28';
const HUB_REMOTE_ID = '16313807';
const LED_DEVICE_ID = '69617402';
const hub = new HarmonyHub(HUB_HOST, HUB_REMOTE_ID);
const readline = require('readline');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function main() {
    hub.connect()
        .then((config) => {
            console.log('Connected to the hub');
            // console.log(JSON.stringify(config, null, '  '));
            var device = config.device.find(d => d.id === LED_DEVICE_ID);
            console.log(JSON.stringify(device, null, '  '));
            var commands = [].concat.apply([], [device.controlGroup.map(g => g.function)]).reduce((accum, val) => accum.concat(val), []).map(c => c.name).sort();

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            var i = 0;
            var commandString = commands.map(c => `${i++}:\t${c}`).join('\n');

            rl.setPrompt(`${commandString}\n\nEnter a command number (0 - ${commands.length - 1}, or -1 to quit): `);
            rl.prompt();

            rl.on('line', async (line) => {
                var cmd = parseInt(line.trim());
                if (cmd >= 0 && cmd < commands.length) {
                    console.log(`Sending '${commands[cmd]}' to your hub...`);
                    //console.log(`hub.sendCommand(${commands[cmd]}, ${LED_DEVICE_ID}, 'press')`);
                    hub.sendCommand(commands[cmd], LED_DEVICE_ID, 'press');
                    console.log(`Sent '${commands[cmd]}' to your hub!\n\n`);
                    await sleep(1000);
                } else if (cmd < 0) {
                    rl.close();
                } else {
                    console.log(`Command #${cmd} is not valid.`);
                }

                rl.prompt();
            }).on('close', () => {
                hub.disconnect();
                process.exit(0);
            })
        });
}

main();