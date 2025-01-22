import { HttpMethod } from '../http/types';
import { BrowseNodeInfoResource } from '../models/BrowseNodeInfo';
import { Images, ImagesResource } from '../models/Images';
import { ItemInfo, ItemInfoResource } from '../models/ItemInfo';
import { Offers, OffersResource } from '../models/Offers';
import { Currency, Language, Marketplace } from '../models/types';
import { CommonRequest, CommonRequestPayload, CommonResponse } from './CommonRequest';
export declare type GetItemsCondition = 'Any' | 'New' | 'Used' | 'Collectible' | 'Refurbished';
export declare type GetItemsMerchant = 'All' | 'Amazon';
export declare type GetItemsResource = BrowseNodeInfoResource | ImagesResource | ItemInfoResource | OffersResource | 'ParentASIN';
export interface GetItemsPayload {
    Condition?: GetItemsCondition;
    CurrencyOfPreference?: Currency;
    ItemIdType?: 'ASIN';
    ItemIds: string[];
    LanguagesOfPreference?: Language[];
    Marketplace?: Marketplace;
    Merchant?: GetItemsMerchant;
    OfferCount?: number;
    Resources?: GetItemsResource[];
}
export interface Item {
    ASIN: string;
    DetailPageURL: string;
    ParentASIN?: string;
    Images?: Images;
    ItemInfo?: ItemInfo;
    Offers?: Offers;
}
export interface ItemsResult {
    Items: Item[];
}
export interface GetItemsResponse extends CommonResponse {
    ItemsResult: ItemsResult;
}
export declare class GetItemsRequest extends CommonRequest<GetItemsResponse> {
    private readonly payload;
    protected readonly method: HttpMethod;
    protected readonly path: string;
    protected readonly target: string;
    constructor(payload: GetItemsPayload, ...commonRequestParams: ConstructorParameters<typeof CommonRequest>);
    protected _buildPayload(): CommonRequestPayload & GetItemsPayload;
}
