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
import { FadeHandler } from './fadeHandler';
import { JumpHandler } from './jumpHandler';
import { AllEffectsHandler } from './allEffectsHandler';
import { SpeedUpHandler } from './speedUpHandler';
import { SlowDownHandler } from './slowDownIntent';

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
    new SunsetHandler(harmonyDevice),
    new FadeHandler(harmonyDevice),
    new JumpHandler(harmonyDevice),
    new AllEffectsHandler(harmonyDevice),
    new SpeedUpHandler(harmonyDevice),
    new SlowDownHandler(harmonyDevice),
];