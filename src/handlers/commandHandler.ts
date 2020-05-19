import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model';
import { HarmonyDevice } from '../harmony/harmonyDevice'

class CommandHandler implements RequestHandler {
    private harmonyDevice: HarmonyDevice;
    constructor(hubAddress: string, remoteId: string, deviceId: string) {
        this.harmonyDevice = new HarmonyDevice(hubAddress, remoteId, deviceId);
    }

    canHandle(input: HandlerInput): boolean | Promise<boolean> {
        return input.requestEnvelope.request.type === 'IntentRequest'
            && input.requestEnvelope.request.intent.name === 'CommandIntent'; 
    }
    
    handle(input: HandlerInput): Response | Promise<Response> {
        var request = input.requestEnvelope.request as IntentRequest;
        var cmd = request.intent.slots["CommandName"];

        if(input.requestEnvelope.request as IntentRequest)
        throw new Error("Method not implemented.");
    }
}