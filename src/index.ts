import { Factory } from "./factory"
import Router from "./hooks/Router"
import useMatch from "./hooks/useMatch"
import useInvalid from "./hooks/useInvalid"
import Link, { LinkProps } from "./components/Link"
import Route, { RouteProps } from "./components/Route"
import Parser from "./Parser"
export { Link, useMatch, useInvalid, Router, LinkProps, Route, RouteProps, Parser }

export const useParams = () => (Factory.params || {})
export const useQuery = () => (Factory.query || {})
