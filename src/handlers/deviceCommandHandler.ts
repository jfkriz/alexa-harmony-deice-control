import { HandlerInput } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model';
import { BaseHarmonyDeviceCommandHandler } from './baseHarmonyDeviceCommandHandler';

export class DeviceCommandHandler extends BaseHarmonyDeviceCommandHandler {
    isHandledIntent(intentName: string): boolean {
        return intentName === 'DeviceCommandIntent';
    }

    async doHandle(input: HandlerInput, request: IntentRequest): Promise<Response> {
        var cmd = this.getSlotValue('CommandName', request);

        if(!cmd || !cmd.value) {
            return input.responseBuilder
                .speak('Sorry, I don\'t know what command you want to run.')
                .withShouldEndSession(true)
                .getResponse()
        }

        return await this.sendCommand(cmd.value, input);
    }
}