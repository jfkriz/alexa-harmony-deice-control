import { HandlerInput } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model';
import { BaseHarmonyDeviceCommandHandler } from './baseHarmonyDeviceCommandHandler';

export class ColorHandler extends BaseHarmonyDeviceCommandHandler {
    isHandledIntent(intentName: string): boolean {
        return intentName === 'ColorIntent';
    }

    async doHandle(input: HandlerInput, request: IntentRequest): Promise<Response> {
        var cmd = request.intent.slots['ColorName'];

        if(!cmd || !cmd.value) {
            return input.responseBuilder
                .speak('Sorry, I don\'t know what color you want to set.')
                .withShouldEndSession(true)
                .getResponse()
        }

        return await this.sendCommand(cmd.value, input, `Your lights are ${cmd.value} now.`);
    }
}