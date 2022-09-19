import { useMemo, useEffect, useState, useId } from 'react'
import Parser from "./Parser";

type RouteId = string
type GroupId = string

export interface RoutesProps {
   dispatch: Function;
   path: string;
   params: { [key: string]: any } | false
}
export interface GroupProps {
   basepath?: string;
   dispatch: Function;
   onError?: () => void;
   onFound?: (route: RoutesProps) => void;
   routes: Map<RouteId, RoutesProps>
}

interface CoreProps {
   currentGroup: null | string,
   groups: Map<GroupId, GroupProps>;
   actives: Map<GroupId, RouteId[]>;
}

export const core: CoreProps = {
   currentGroup: null,
   groups: new Map<GroupId, GroupProps>(),
   actives: new Map<GroupId, RouteId[]>()
}


export const useGroup = (props: Omit<GroupProps, 'routes' | 'dispatch'>) => {
   const uid = useId()
   const [d, dispatch] = useState(0)
   const prevGroupId = useMemo(() => core.currentGroup, [])

   // set current group
   useMemo(() => {
      core.currentGroup = uid
      core.groups.set(uid, {
         ...props,
         dispatch: () => { },
         routes: new Map
      })
   }, [])

   useEffect(() => {
      core.currentGroup = prevGroupId
      const get = core.groups.get(uid)
      if (get) {
         core.groups.set(uid, {
            ...get,
            dispatch: () => dispatch(Math.random()),
         })
      }
      return () => {
         core.groups.delete(uid)
      }
   }, [])

   useEffect(() => {
      const group = core.groups.get(uid)
      if (group) {
         let found = false;

         group.routes.forEach((route, routeId) => {
            const path = group.basepath ? `${group.basepath}${route.path}` : route.path
            const params = Parser.isMatch(path, window.location.pathname) || false
            if (params || route.params) {
               group.routes.set(routeId, {
                  ...route,
                  params
               })
               route.dispatch()
            }
            if (!found && params) {
               group.onFound && group.onFound(route)
               found = true
            }
         })

         if (!found) {
            group.onError && group.onError()
         }
      }
   }, [d])
}

export interface useRouteProps {
   path: string;
}
export const useRoute = (path: string) => {
   const uid = useId()
   const [d, dispatch] = useState(0)
   const groupId = useMemo(() => core.currentGroup, [])
   const group = useMemo(() => groupId && core.groups.get(groupId), [])
   useMemo(() => {
      if (group) {
         group.routes.set(uid, {
            dispatch: () => { },
            path,
            params: false
         })
      }
   }, [])

   const params = useMemo(() => {
      let _params: RoutesProps['params'] = Parser.isMatch(path, window.location.pathname) || false;

      return _params
   }, [d])

   useEffect(() => {
      if (group) {
         group.routes.set(uid, {
            dispatch: () => dispatch(Math.random()),
            path,
            params
         })
      }
      return () => {
         if (group) {
            group.routes.delete(uid)
         }
      }
   }, [])

   return group && group.routes.get(uid)?.params
}

window.addEventListener('popstate', () => {
   core.groups.forEach((group) => group.dispatch())
})