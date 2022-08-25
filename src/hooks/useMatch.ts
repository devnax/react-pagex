import { useState, useMemo, useEffect, useId } from 'react'
import { Factory, RegexPathType } from "../factory"
import Parser from '../Parser'


const useMatch = (path: RegexPathType) => {
   const id = useId()
   const [, dispatch] = useState(0)

   useMemo(() => {
      const items = Factory.routes[path]
      if (!items) Factory.routes[path] = {}
      Factory.routes[path][id] = {
         dispatch: () => { },
         path,
      }
   }, [])

   useEffect(() => {
      Factory.routes[path][id] = {
         ...Factory.routes[path][id],
         dispatch: () => dispatch(Math.random())
      }
      return () => {
         delete Factory.routes[path][id]
      }
   }, [])

   // Initial Check
   useMemo(() => {
      const match = Parser.isMatch(path, window.location.pathname)
      if (match) {
         Factory.active = path
         Factory.params = match.params
         Factory.query = match.query
      }
   }, [])

   return Factory.active === path ? { params: Factory.params, query: Factory.query } : null
}


export default useMatch