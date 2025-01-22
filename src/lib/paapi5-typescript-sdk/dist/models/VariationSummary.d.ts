import { Price, Resources } from './types';
export interface VariationPrice {
    HighestPrice?: Price;
    LowestPrice?: Price;
}
export declare type VariationPriceResource = Resources<VariationPrice, 'VariationSummary.Price.'>;
export interface VariationDimension {
    DisplayName: string;
    Name: string;
    Values: string[];
}
export interface VariationSummary {
    PageCount: number;
    Price: VariationPrice;
    VariationCount: number;
    VariationDimensions?: VariationDimension[];
}
export declare type VariationSummaryResource = Resources<VariationSummary, 'VariationSummary.'> | VariationPriceResource;
