import { Resources } from './types';
export interface BrowseNode {
    Id: string;
    DisplayName: string;
    ContextFreeName: string;
    IsRoot: boolean;
    Ancestor?: BrowseNode;
    Children?: BrowseNode[];
    SalesRank?: string;
}
export declare type BrowseNodeResource = Resources<BrowseNode, 'BrowseNodes.'>;
