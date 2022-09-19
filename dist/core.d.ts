declare type RouteId = string;
declare type GroupId = string;
export interface RoutesProps {
    dispatch: Function;
    path: string;
    params: {
        [key: string]: any;
    } | false;
}
export interface GroupProps {
    basepath?: string;
    dispatch: Function;
    onError?: () => void;
    onFound?: (route: RoutesProps) => void;
    routes: Map<RouteId, RoutesProps>;
}
interface CoreProps {
    currentGroup: null | string;
    groups: Map<GroupId, GroupProps>;
    actives: Map<GroupId, RouteId[]>;
}
export declare const core: CoreProps;
export declare const useGroup: (props: Omit<GroupProps, 'routes' | 'dispatch'>) => void;
export interface useRouteProps {
    path: string;
}
export declare const useRoute: (path: string) => false | "" | {
    [key: string]: any;
} | null | undefined;
export {};
