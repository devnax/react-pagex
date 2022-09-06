import { useEffect } from 'react'
import { Excute } from '../factory'
interface Props {
   children: any;
}

const RouteProvider = ({ children }: Props) => {
   useEffect(() => {
      Excute()
   }, [])
   return children
}

export default RouteProvider