import { createAskSdkError } from 'ask-sdk-core';
import { RequestEnvelope } from 'ask-sdk-model';
import { Verifier } from 'ask-sdk-express-adapter';
import { IncomingHttpHeaders } from 'http';
import { logger } from '../util';

export class DeviceIdRequestVerifier implements Verifier {
    private allowedDeviceIdList?: Array<string> = null;

    constructor(allowedDeviceIdList?: string) {
        if (allowedDeviceIdList) {
            this.allowedDeviceIdList = allowedDeviceIdList.split(",");
        }
    }

    verify(requestEnvelope: string, headers?: IncomingHttpHeaders): Promise<void | string> {
        const requestEnvelopeJson: RequestEnvelope = JSON.parse(requestEnvelope);
        return this.verifyRequest(requestEnvelopeJson);
    }

    verifyRequest(requestEnvelope: RequestEnvelope): Promise<void| string> {
        var deviceId = requestEnvelope.context.System.device.deviceId;
        if (this.allowedDeviceIdList && !this.allowedDeviceIdList.includes(deviceId)) {
            var userId = requestEnvelope.context.System.user.userId;
            var person = requestEnvelope.context.System.person;
            var personId = person ? person.personId : null;
            var personName = personId == null ? "" : `<alexa:name type="first" personId="${personId}"/>`;
            logger.error(`User ID ${userId} ${personId == null ? "" : "and Person ID " + personId} on Device ID ${deviceId} was blocked from using this skill.`);

            throw createAskSdkError(this.constructor.name, `Sorry ${personName}, the Echo you're using is not allowed to do that.`);
        }

        return;
    }
}
