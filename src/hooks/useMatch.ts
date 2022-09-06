import { useState, useMemo, useEffect, useId } from 'react'
import { Factory, PathString, FactoryItem } from "../factory"
import Parser from "../Parser";

const useMatch = (path?: PathString) => {
   const id = useId()
   const [, dispatch] = useState(0)

   useMemo(() => {
      let params = null
      if (path) {
         params = Parser.isMatch(path, window.location.pathname)
      }
      Factory.set(id, {
         id,
         params,
         dispatch: () => { },
         path
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   useEffect(() => {
      Factory.set(id, {
         ...Factory.get(id) as FactoryItem,
         dispatch: () => dispatch(Math.random())
      })

      return () => {
         Factory.delete(id)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const item = Factory.get(id)
   return item?.params
}


export default useMatch