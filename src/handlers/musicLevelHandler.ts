import { HandlerInput } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model';
import { BaseHarmonyDeviceCommandHandler } from './baseHarmonyDeviceCommandHandler';

export class MusicLevelHandler extends BaseHarmonyDeviceCommandHandler {
    isHandledIntent(intentName: string): boolean {
        return intentName === 'MusicLevelIntent';
    }

    async doHandle(input: HandlerInput, request: IntentRequest): Promise<Response> {
        var level = request.intent.slots['MusicLevel'];

        if(!level || !level.value) {
            return input.responseBuilder
                .speak('Sorry, I don\'t know what command you want to run.')
                .withShouldEndSession(true)
                .getResponse()
        }

        var cmd = `Music ${level.value}`;

        return await this.sendCommand(cmd, input, `Your lights are now listening for music at level ${level}.`);
    }
}