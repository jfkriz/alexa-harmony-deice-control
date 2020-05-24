import { HandlerInput } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model';
import { BaseHarmonyDeviceCommandHandler } from './baseHarmonyDeviceCommandHandler';

export class BrightnessDownHandler extends BaseHarmonyDeviceCommandHandler {
    isHandledIntent(intentName: string): boolean {
        return intentName === 'BrightnessDownIntent';
    }

    async doHandle(input: HandlerInput, request: IntentRequest): Promise<Response> {
        var cmd = 'BrightnessUp';

        return await this.sendCommand(cmd, input, 'Your lights are dimmer now.');
    }
}