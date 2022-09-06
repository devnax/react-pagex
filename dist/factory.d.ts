export declare type PathString = string;
export declare type FactoryId = string;
export interface FactoryItem {
    id: string;
    params: {
        [key: string]: any;
    } | null;
    path?: string;
    dispatch: () => void;
}
export declare const Factory: Map<string, FactoryItem>;
export declare const Excute: () => void;
