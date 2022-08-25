import React, { ComponentType } from 'react'
import useMatch from '../hooks/useMatch'
import useInvalid from '../hooks/useInvalid'


type RenderProps = {
   params?: { [key: string]: any };
   query?: { [key: string]: any };
}

export interface RouteProps {
   path?: string;
   render: ComponentType<RenderProps>;
}


const Valid = ({ path, render: Render }: Required<RouteProps>) => {
   const option = useMatch(path)
   return option ? <Render {...option} /> : <></>
}

const InValid = ({ render: Render }: RouteProps) => {
   const isError = useInvalid()
   return isError ? <Render /> : <></>
}

const Route = (props: RouteProps) => {
   if (typeof props.path === 'string') {
      return <Valid {...props} path={props.path} />
   }
   return <InValid {...props} />
}

export default Route