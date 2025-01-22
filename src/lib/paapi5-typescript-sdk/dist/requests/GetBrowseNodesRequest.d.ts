import { HttpMethod } from '../http/types';
import { BrowseNode, BrowseNodeResource } from '../models/BrowseNode';
import { Language, Marketplace } from '../models/types';
import { CommonRequest, CommonRequestPayload, CommonResponse } from './CommonRequest';
export declare type GetBrowseNodesResource = BrowseNodeResource;
export interface GetBrowseNodesPayload {
    BrowseNodeIds: string[];
    LanguagesOfPreference?: Language[];
    Marketplace?: Marketplace;
    Resources: GetBrowseNodesResource[];
}
export interface GetBrowseNodesResponse extends CommonResponse {
    BrowseNodesResult: {
        BrowseNodes: BrowseNode[];
    };
}
export declare class GetBrowseNodesRequest extends CommonRequest<GetBrowseNodesResponse> {
    private readonly payload;
    protected readonly method: HttpMethod;
    protected readonly path: string;
    protected readonly target: string;
    constructor(payload: GetBrowseNodesPayload, ...commonRequestParams: ConstructorParameters<typeof CommonRequest>);
    protected _buildPayload(): CommonRequestPayload & GetBrowseNodesPayload;
}
