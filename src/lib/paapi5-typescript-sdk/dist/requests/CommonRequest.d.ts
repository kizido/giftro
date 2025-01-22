import { SignHelper } from '../auth/SignHelper';
import { Headers, HttpMethod, Payload } from '../http/types';
import { APIError } from '../models/types';
export declare enum PartnerType {
    ASSOCIATES = "Associates"
}
export declare enum Host {
    AUSTRALIA = "webservices.amazon.com.au",
    BRAZIL = "webservices.amazon.com.br",
    CANADA = "webservices.amazon.ca",
    FRANCE = "webservices.amazon.fr",
    GERMANY = "webservices.amazon.de",
    INDIA = "webservices.amazon.in",
    ITALY = "webservices.amazon.it",
    JAPAN = "webservices.amazon.co.jp",
    MEXICO = "webservices.amazon.com.mx",
    NETHERLANDS = "webservices.amazon.nl",
    SINGAPORE = "webservices.amazon.sg",
    SAUDI_ARABIA = "webservices.amazon.sa",
    SPAIN = "webservices.amazon.es",
    SWEDEN = "webservices.amazon.se",
    TURKEY = "webservices.amazon.com.tr",
    UNITED_ARAB_EMIRATES = "webservices.amazon.ae",
    UNITED_KINGDOM = "webservices.amazon.co.uk",
    UNITED_STATES = "webservices.amazon.com"
}
export declare enum Region {
    AUSTRALIA = "us-west-2",
    BRAZIL = "us-east-1",
    CANADA = "us-east-1",
    FRANCE = "eu-west-1",
    GERMANY = "eu-west-1",
    INDIA = "eu-west-1",
    ITALY = "eu-west-1",
    JAPAN = "us-west-2",
    MEXICO = "us-east-1",
    NETHERLANDS = "eu-west-1",
    SINGAPORE = "us-west-2",
    SAUDI_ARABIA = "eu-west-1",
    SPAIN = "eu-west-1",
    SWEDEN = "eu-west-1",
    TURKEY = "eu-west-1",
    UNITED_ARAB_EMIRATES = "eu-west-1",
    UNITED_KINGDOM = "eu-west-1",
    UNITED_STATES = "us-east-1"
}
export interface CommonRequestHeaders extends Headers {
    'content-encoding': string;
    'content-type': string;
    host: string;
    'x-amz-target': string;
    'x-amz-date': string;
    authorization: string;
}
export interface CommonRequestPayload extends Payload {
    PartnerTag: string;
    PartnerType: PartnerType;
}
export interface CommonResponse {
    Errors: APIError[];
}
export declare class CommonRequest<ResponseType extends CommonResponse = CommonResponse> {
    protected readonly partnerTag: string;
    protected readonly partnerType: PartnerType;
    protected readonly accessKey: string;
    protected readonly secretKey: string;
    protected readonly host: Host;
    protected readonly region: Region;
    protected readonly service: string;
    protected readonly method: HttpMethod;
    protected readonly path: string;
    protected readonly target: string;
    protected _signHelper: SignHelper;
    constructor(partnerTag: string, partnerType: PartnerType, accessKey: string, secretKey: string, host: Host, region: Region);
    send(): Promise<ResponseType>;
    protected _buildUrl(): string;
    protected _buildHeaders(timestamp: number, payload: CommonRequestPayload): CommonRequestHeaders;
    protected _buildPayload(): CommonRequestPayload;
}
