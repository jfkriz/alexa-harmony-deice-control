import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model';
import { HarmonyDevice } from '../harmony/harmonyDevice'

export class DeviceCommandHandler implements RequestHandler {
    private harmonyDevice: HarmonyDevice;
    constructor(hubAddress: string, remoteId: string, deviceId: string) {
        this.harmonyDevice = new HarmonyDevice(hubAddress, remoteId, deviceId);
    }

    canHandle(input: HandlerInput): boolean | Promise<boolean> {
        return input.requestEnvelope.request.type === 'IntentRequest'
            && input.requestEnvelope.request.intent.name === 'DeviceCommandIntent'; 
    }
    
    async handle(input: HandlerInput): Promise<Response> {
        var request = input.requestEnvelope.request as IntentRequest;
        var cmd = request.intent.slots['CommandName'];

        if(!cmd || !cmd.value) {
            return input.responseBuilder
                .speak('Sorry, I don\'t know what command you want to run.')
                .withShouldEndSession(true)
                .getResponse()
        }

        if(!await this.harmonyDevice.hasCommand(cmd.value)) {
            return input.responseBuilder
                .speak(`Sorry, I couldn't find command "${cmd.value}".`)
                .withShouldEndSession(true)
                .getResponse()
        }

        await this.harmonyDevice.sendCommand(cmd.value);
        return input.responseBuilder
            .speak('Okay.')
            .withShouldEndSession(true)
            .getResponse();
    }
}