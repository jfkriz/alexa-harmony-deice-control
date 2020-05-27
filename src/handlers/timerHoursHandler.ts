import { HandlerInput } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model';
import { BaseHarmonyDeviceCommandHandler } from './baseHarmonyDeviceCommandHandler';

export class TimerHoursHandler extends BaseHarmonyDeviceCommandHandler {
    isHandledIntent(intentName: string): boolean {
        return intentName === 'TimerHoursIntent';
    }

    async doHandle(input: HandlerInput, request: IntentRequest): Promise<Response> {
        var hours = this.getSlotValue('TimerHours', request);

        if(!hours || !hours.value) {
            return input.responseBuilder
                .speak('Sorry, I don\'t know what command you want to run.')
                .withShouldEndSession(true)
                .getResponse()
        }

        var cmd = `${hours.value} Hour`;

        return await this.sendCommand(cmd, input, `Your lights will go off after ${hours.value} hour${hours.value == "1" ? "" : "s"}`);
    }
}