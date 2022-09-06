import { ComponentType } from 'react';
declare type RenderProps = {
    params?: {
        [key: string]: any;
    };
};
export interface RouteProps {
    path?: string;
    render: ComponentType<RenderProps>;
}
declare const Route: ({ path, render: Render }: RouteProps) => JSX.Element;
export default Route;
