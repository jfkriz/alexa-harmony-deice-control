import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model';
import { HarmonyDevice } from '../harmony/harmonyDevice'

export abstract class BaseHarmonyDeviceCommandHandler implements RequestHandler {
    constructor(private harmonyDevice: HarmonyDevice) {
    }

    canHandle(input: HandlerInput): boolean | Promise<boolean> {
        return input.requestEnvelope.request.type === 'IntentRequest'
            && this.isHandledIntent(input.requestEnvelope.request.intent.name); 
    }

    async handle(input: HandlerInput): Promise<Response> {
        return this.doHandle(input, input.requestEnvelope.request as IntentRequest);
    }

    abstract async doHandle(input: HandlerInput, intentRequest: IntentRequest): Promise<Response>;

    abstract isHandledIntent(intentName: string): boolean;

    async sendCommand(cmd: string, input: HandlerInput, successResponseText?: string): Promise<Response> {
        if(!await this.harmonyDevice.hasCommand(cmd)) {
            return input.responseBuilder
                .speak(`Sorry, I couldn't find command "${cmd}".`)
                .withShouldEndSession(true)
                .getResponse()
        }

        await this.harmonyDevice.sendCommand(cmd);
        return input.responseBuilder
            .speak(successResponseText || 'Okay.')
            .withShouldEndSession(true)
            .getResponse();    
    }
}