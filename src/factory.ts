import Parser from "./Parser";
export type PathString = string
export type FactoryId = string
export interface FactoryItem {
   id: string;
   params: { [key: string]: any } | null;
   path?: string;
   dispatch: () => void;
}

export const Factory = new Map<FactoryId, FactoryItem>()

export const Excute = () => {
   let isMatched = false;
   const invalids: FactoryItem[] = []

   Factory.forEach((item, key) => {
      if (item.params) {
         Factory.set(key, { ...item, params: null })
         item.dispatch()
      }
      if (item.path) {
         const params = Parser.isMatch(item.path, window.location.pathname)
         if (params) {
            isMatched = true
            Factory.set(key, { ...item, params })
            item.dispatch()
         }
      } else {
         invalids.push(item)
      }
   })

   !isMatched && invalids.forEach((item) => {
      Factory.set(item.id, { ...item, params: {} })
      item.dispatch()
   })
}

window.addEventListener('popstate', () => Excute())