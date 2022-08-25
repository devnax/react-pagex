import { useState, useEffect, useId } from 'react'
import { Factory } from "../factory"

const useInvaid = () => {
   const id = useId()
   const [s, dispatch] = useState(0)

   useEffect(() => {
      Factory.invalids[id] = {
         ...Factory.invalids[id],
         dispatch: () => dispatch(Math.random())
      }
      dispatch(Math.random())
      return () => {
         delete Factory.invalids[id]
      }
   }, [])

   return Factory.active ? false : true
}


export default useInvaid