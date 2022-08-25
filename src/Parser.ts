import { parse } from 'regexparam'

export type Result = {
   keys: string[];
   pattern: RegExp;
}

export type CallbackProps = { params: { [key: string]: string }, query: { [key: string]: string } }
export type Callback = (props: CallbackProps) => any;


const parseParams = (path: string, result: Result) => {
   let i = 0, params: { [key: string]: string } = {};
   let matches: any = result.pattern.exec(path);
   while (i < result.keys.length) {
      params[result.keys[i]] = matches[++i] || null;
   }
   return params;
}

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
const isMatch = (regex_path: string, path: string, callback?: Callback) => {
   const result = parse(regex_path)
   const isMatch = result.pattern.test(path)
   if (isMatch) {
      let option = { params: parseParams(path, result), query: parseQuery() }
      if (callback) {
         return callback(option)
      }
      return option
   }
}

const Parser = {
   isMatch,
   parseQuery
}

export default Parser