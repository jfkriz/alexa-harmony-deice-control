import { createAskSdkError } from 'ask-sdk-core';
import { RequestEnvelope } from 'ask-sdk-model';
import { Verifier } from 'ask-sdk-express-adapter';
import { IncomingHttpHeaders } from 'http';

export class DeviceIdRequestVerifier implements Verifier {
    private allowedDeviceIdList?: Array<string>;

    constructor(allowedDeviceIdList?: string) {
        if (allowedDeviceIdList) {
            this.allowedDeviceIdList = allowedDeviceIdList.split(",");
        }
    }

    verify(requestEnvelope: string, headers?: IncomingHttpHeaders): Promise<void | string> {
        const requestEnvelopeJson: RequestEnvelope = JSON.parse(requestEnvelope);
        if (this.allowedDeviceIdList && !this.allowedDeviceIdList.includes(requestEnvelopeJson.context.System.device.deviceId)) {
            throw createAskSdkError(this.constructor.name, 'Device is not allowed to use this skill.');
        }

        return;
    }
}
