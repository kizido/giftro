import { Headers, HttpMethod, Payload } from '../http/types';
import { Region } from '../requests/CommonRequest';
export declare class SignHelper {
    private readonly accessKey;
    private readonly secretKey;
    constructor(accessKey: string, secretKey: string);
    getAuthorizationHeader(path: string, method: HttpMethod, payload: Payload, headers: Headers, region: Region, service: string, timestamp: number): string;
    toAmzDate(timestamp: number): string;
    private _toTime;
    private _toDate;
    private _createAuthorizationHeaders;
    private _createSignedHeaders;
    private _createCanonicalRequest;
    private _createCanonicalHeaders;
    private _createStringToSign;
    private _createCredentialScope;
    private _createSignature;
}
