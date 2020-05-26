import { HandlerInput } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model';
import { BaseHarmonyDeviceCommandHandler } from './baseHarmonyDeviceCommandHandler';

export class SunsetHandler extends BaseHarmonyDeviceCommandHandler {
    isHandledIntent(intentName: string): boolean {
        return intentName === 'SunsetIntent';
    }

    async doHandle(input: HandlerInput, request: IntentRequest): Promise<Response> {
        var cmd = 'Sunset';

        return await this.sendCommand(cmd, input, 'Your lights are acting like a sunset now.');
    }
}