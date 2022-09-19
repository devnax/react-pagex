import React, { ReactElement, ReactNode } from 'react'
import { useGroup, GroupProps } from '../core';

export type RoutesProps = Omit<GroupProps, 'dispatch' | 'routes'> & {
   children: ReactElement | ReactNode
}

const Routes = ({ children, ...props }: RoutesProps) => {
   useGroup(props)
   return <>{children}</>
}

export default Routes