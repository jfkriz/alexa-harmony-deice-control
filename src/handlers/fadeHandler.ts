import { HandlerInput } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model';
import { BaseHarmonyDeviceCommandHandler } from './baseHarmonyDeviceCommandHandler';

export class FadeHandler extends BaseHarmonyDeviceCommandHandler {
    isHandledIntent(intentName: string): boolean {
        return intentName === 'FadeIntent';
    }

    async doHandle(input: HandlerInput, request: IntentRequest): Promise<Response> {
        var colors = this.getSlotValue('WhichColors', request);

        if(!colors || !colors.value) {
            return input.responseBuilder
                .speak('Sorry, I don\'t know what command you want to run.')
                .withShouldEndSession(true)
                .getResponse()
        }

        var cmd = `Fade ${colors.value}`;

        return await this.sendCommand(cmd, input, `Your lights are fading now.`);
    }
}