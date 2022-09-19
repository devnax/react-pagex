import Navigate from "./navigate";
import Link, { LinkProps } from "./components/Link";
import Route, { RouteProps } from "./components/Route";
import Routes, { RoutesProps } from "./components/Routes";
import Parser from "./Parser";
export { Link, Navigate, Routes, Route, Parser };
export type { LinkProps, RouteProps, RoutesProps };
export declare const useQuery: (q?: string) => {
    [key: string]: string;
};
export * from './core';
