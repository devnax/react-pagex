import React, { ComponentType } from 'react'
import useMatch from '../hooks/useMatch'


type RenderProps = {
   params?: { [key: string]: any };
}

export interface RouteProps {
   path?: string;
   render: ComponentType<RenderProps>;
}

const Route = ({ path, render: Render }: RouteProps) => {
   const params = useMatch(path)
   return params ? <Render params={params} /> : <></>
}

export default Route