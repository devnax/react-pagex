import RouteProvider from './components/RouteProvider';
import Router from "./hooks/Router";
import useMatch from "./hooks/useMatch";
import Link, { LinkProps } from "./components/Link";
import Route, { RouteProps } from "./components/Route";
import Parser from "./Parser";
export { RouteProvider, Link, useMatch, Router, Route, Parser };
export type { LinkProps, RouteProps };
export declare const useQuery: (q?: string) => {
    [key: string]: string;
};
