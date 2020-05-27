import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response, IntentRequest, Slot } from 'ask-sdk-model';
import { HarmonyDevice } from '../harmony/harmonyDevice';
import { DeviceIdRequestVerifier } from '../verifiers/deviceIdRequestVerifier';

export abstract class BaseHarmonyDeviceCommandHandler implements RequestHandler {
    public deviceIdRequestVerifier: DeviceIdRequestVerifier;
    constructor(private harmonyDevice: HarmonyDevice) {
        this.deviceIdRequestVerifier = new DeviceIdRequestVerifier(process.env.ALLOWED_ALEXA_DEVICE_LIST);
    }

    canHandle(input: HandlerInput): boolean | Promise<boolean> {
        return input.requestEnvelope.request.type === 'IntentRequest'
            && this.isHandledIntent(input.requestEnvelope.request.intent.name); 
    }

    async handle(input: HandlerInput): Promise<Response> {
        try {
            this.deviceIdRequestVerifier.verifyRequest(input.requestEnvelope);
        } catch(e) {
            return input.responseBuilder
                .speak(e.message)
                .withShouldEndSession(true)
                .getResponse();
        }

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

    getSlotValue(slotName: string, request: IntentRequest): Slot {
        const slots = request.intent.slots;
        if(!slots) {
            return null;
        }

        const slot = slots[slotName];
        if(!slot) {
            return null;
        }

        if(!slot.resolutions || !slot.resolutions.resolutionsPerAuthority) {
            return slot;
        }

        const slotValue = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name || slot.value;
        return { name: slot.name, value: slotValue, resolutions: slot.resolutions, confirmationStatus: slot.confirmationStatus };
    }
}