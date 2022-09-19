import { ReactElement, ReactNode } from 'react';
import { GroupProps } from '../core';
export declare type RoutesProps = Omit<GroupProps, 'dispatch' | 'routes'> & {
    children: ReactElement | ReactNode;
};
declare const Routes: ({ children, ...props }: RoutesProps) => JSX.Element;
export default Routes;
