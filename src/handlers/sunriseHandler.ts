import { HandlerInput } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model';
import { BaseHarmonyDeviceCommandHandler } from './baseHarmonyDeviceCommandHandler';

export class SunriseHandler extends BaseHarmonyDeviceCommandHandler {
    isHandledIntent(intentName: string): boolean {
        return intentName === 'SunriseIntent';
    }

    async doHandle(input: HandlerInput, request: IntentRequest): Promise<Response> {
        var cmd = 'Sunrise';

        return await this.sendCommand(cmd, input, 'Your lights are acting like a sunrise now.');
    }
}