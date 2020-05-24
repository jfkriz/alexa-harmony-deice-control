import { DeviceCommandHandler } from './deviceCommandHandler';
import { PowerToggleHandler } from './powerToggleHandler';
import { ColorHandler } from './colorHandler'
import { BrightnessUpHandler } from './brightnessUpHandler';
import { BrightnessDownHandler } from './brightnessDownHandler';
import { TimerHoursHandler } from './timerHoursHandler'
import { HarmonyDevice } from '../harmony/harmonyDevice'

export const harmonyDevice = new HarmonyDevice(process.env.HUB_HOST_ADDRESS, process.env.HUB_REMOTE_ID, process.env.DEVICE_ID);

export const harmonyHandlers = [
    new DeviceCommandHandler(harmonyDevice),
    new PowerToggleHandler(harmonyDevice),
    new ColorHandler(harmonyDevice),
    new BrightnessUpHandler(harmonyDevice),
    new BrightnessDownHandler(harmonyDevice),
    new TimerHoursHandler(harmonyDevice)
];