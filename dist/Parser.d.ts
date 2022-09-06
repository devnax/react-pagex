export declare type Result = {
    keys: string[];
    pattern: RegExp;
};
export declare type CallbackProps = {
    params: {
        [key: string]: string;
    };
};
export declare type Callback = (props: CallbackProps) => any;
declare const Parser: {
    isMatch: (regex_path: string, path: string) => object | null;
    parseQuery: (q?: string) => {
        [key: string]: string;
    };
};
export default Parser;
