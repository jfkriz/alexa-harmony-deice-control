const HarmonyHub = require('harmonyhub-api').HarmonyHub;
const HUB_HOST = '192.168.86.28';
const HUB_REMOTE_ID = '16313807';
const hub = new HarmonyHub(HUB_HOST, HUB_REMOTE_ID);

hub.connect()
    .then((config) => {
        console.log('Connected to the hub');

        console.log('\nActivities\n==========');
        config.activity.forEach(activity => {
            console.log(`${activity.label} (${activity.id})`);
        });

        console.log('\nDevices\n========');
        config.device.forEach(device => {
            console.log(`\n${device.label} (${device.id})`);
            console.log('  Control Groups\n  ========');
            device.controlGroup.forEach(group => {
                console.log(`\n    ${group.name}\n    ========`)
                group.function.forEach(f => {
                    console.log(`    ${f.name}`);
                })
            })
            //console.log(`${JSON.stringify(device, null, '  ')}`);
        });

        hub.disconnect();
    });