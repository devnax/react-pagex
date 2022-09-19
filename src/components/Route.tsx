import React, { ComponentType } from 'react'
import { useRoute } from '../core'

type RenderProps = {
   params?: { [key: string]: any };
}

export interface RouteProps {
   path: string;
   render: ComponentType<RenderProps>;
}

const Route = ({ path, render: Render }: RouteProps) => {
   const params = useRoute(path)
   return params ? <Render params={params} /> : <></>
}

export default Route