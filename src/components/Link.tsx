import { ComponentType, createElement, FC, ReactElement } from 'react'
import navigate from '../navigate'

export interface LinkProps {
   children?: string | ReactElement;
   label?: string;
   href: string;
   noHref?: boolean;
   component?: ComponentType<any>
}


const Link: FC<LinkProps> = ({ href, noHref, children, label, component }) => {
   return createElement(component || 'a', {
      ...(noHref !== false ? { href } : {}),
      onClick: (e: any) => {
         e.preventDefault()
         navigate.go(href)
      }
   }, children || label)
}

export default Link