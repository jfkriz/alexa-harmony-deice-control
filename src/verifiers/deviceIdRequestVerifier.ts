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
        var deviceId = requestEnvelopeJson.context.System.device.deviceId;
        if (this.allowedDeviceIdList && !this.allowedDeviceIdList.includes(deviceId)) {
            var userId = requestEnvelopeJson.context.System.user.userId;
            logger.error(`User ID ${userId} on Device ID ${deviceId} was blocked from using this skill.`);
            throw createAskSdkError(this.constructor.name, 'Device is not allowed to use this skill.');
        }

        return;
    }
}
