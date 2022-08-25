import Parser from "./Parser";

export type RegexPathType = string

export interface FacyoryRoutesType {
   path: RegexPathType;
   dispatch: Function;
}

export interface FactoryOption {
   active: RegexPathType | false; // path
   params?: { [key: string]: any };
   query?: { [key: string]: any };
   routes: {
      [regexpath: RegexPathType]: {
         [id: string]: FacyoryRoutesType
      }
   },
   invalids: {
      [id: string]: FacyoryRoutesType
   }
}

export const Factory: FactoryOption = {
   active: false,
   params: {},
   query: {},
   routes: {},
   invalids: {},
}


window.addEventListener('popstate', (event) => {
   const activeItem = Factory.routes[Factory.active as any] || {}
   const path = event?.state?.path || window.location.pathname

   let isMatch = false
   for (let regexpath of Object.keys(Factory.routes)) {
      const match = Parser.isMatch(regexpath, path)

      if (match) {
         Factory.active = regexpath
         Factory.params = match.params
         Factory.query = match.query
         Object.values(Factory.routes[regexpath] || {}).forEach(route => route.dispatch())
         isMatch = true;
      }
   }

   Object.values(activeItem).forEach(route => route.dispatch())

   if (!isMatch) {
      isMatch = false
      Factory.active = false
      Factory.params = {}
      Factory.query = {}

      for (let regexpath of Object.keys(Factory.routes)) {
         Object.values(Factory.routes[regexpath] || {}).forEach(route => route.dispatch())
      }
   }
   Object.values(Factory.invalids || {}).forEach(route => route.dispatch())

})