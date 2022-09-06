import { ComponentType, FC, ReactElement } from 'react';
export interface LinkProps {
    children?: string | ReactElement;
    label?: string;
    href: string;
    noHref?: boolean;
    component?: ComponentType<any>;
}
declare const Link: FC<LinkProps>;
export default Link;
