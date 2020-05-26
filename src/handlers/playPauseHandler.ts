import { HandlerInput } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model';
import { BaseHarmonyDeviceCommandHandler } from './baseHarmonyDeviceCommandHandler';

export class PlayPauseHandler extends BaseHarmonyDeviceCommandHandler {
    isHandledIntent(intentName: string): boolean {
        return intentName === 'PlayPauseIntent';
    }

    async doHandle(input: HandlerInput, request: IntentRequest): Promise<Response> {
        var cmd = 'Play/Pause';

        return await this.sendCommand(cmd, input, 'Okay.');
    }
}