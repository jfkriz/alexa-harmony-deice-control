import { DeviceCommandHandler } from './deviceCommandHandler';
import { PowerToggleHandler } from './powerToggleHandler';
import { ColorHandler } from './colorHandler'
import { BrightnessUpHandler } from './brightnessUpHandler';
import { BrightnessDownHandler } from './brightnessDownHandler';
import { TimerHoursHandler } from './timerHoursHandler'
import { HarmonyDevice } from '../harmony/harmonyDevice'
import { MusicLevelHandler } from './musicLevelHandler';
import { PlayPauseHandler } from './playPauseHandler';
import { SunriseHandler } from './sunriseHandler';
import { SunsetHandler } from './sunsetHandler';

export const harmonyDevice = new HarmonyDevice(process.env.HUB_HOST_ADDRESS, process.env.HUB_REMOTE_ID, process.env.DEVICE_ID);

export const harmonyHandlers = [
    new DeviceCommandHandler(harmonyDevice),
    new PowerToggleHandler(harmonyDevice),
    new ColorHandler(harmonyDevice),
    new BrightnessUpHandler(harmonyDevice),
    new BrightnessDownHandler(harmonyDevice),
    new TimerHoursHandler(harmonyDevice),
    new MusicLevelHandler(harmonyDevice),
    new PlayPauseHandler(harmonyDevice),
    new SunriseHandler(harmonyDevice),
    new SunsetHandler(harmonyDevice)
];