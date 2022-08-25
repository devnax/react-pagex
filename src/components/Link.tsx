import { ComponentType, createElement, FC, ReactElement } from 'react'
import Router from '../hooks/Router'

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
         Router.go(href)
      }
   }, children || label)
}

export default Link