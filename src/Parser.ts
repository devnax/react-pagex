import { match } from 'path-to-regexp'


export type Result = {
   keys: string[];
   pattern: RegExp;
}

export type CallbackProps = { params: { [key: string]: string } }
export type Callback = (props: CallbackProps) => any;

const parseQuery = (q = window.location.search) => {
   if (!q) return {}
   const query_string = q.substring(1);
   const vars = query_string.split('&')
   const query: { [key: string]: string } = {}
   for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      query[pair[0]] = pair[1]
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
   }
   return query
}

const isMatch = (regex_path: string, path: string) => {
   const m = match(regex_path, { decode: decodeURIComponent })
   const matches = m(path)
   return matches ? matches.params : null
}

const Parser = {
   isMatch,
   parseQuery
}

export default Parser