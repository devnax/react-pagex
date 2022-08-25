
## React PageX

The `react-pagex` is a very tiny library for manage react app routes. It's very simple to use.



### Availabel Hooks and Components

```js
import {
  Link,
  Route,
  Router,
  useMatch,
  useInvalid,
  useParams,
  useQuery,
  Parser
} from 'react-pagex'

```




### Useg

```jsx
import {Link, Route} from 'react-pagex'


const Home = ({params, query}) => {
  return <h1>Home</h1>
}
const About = ({params, query}) => {
  return <h1>About</h1>
}

const Contact = ({params, query}) => {
  return <h1>Contact</h1>
}

const ErrorPage = () => {
  return <h1>404</h1>
}


export default () => {
   return (
      <div>
         <ul>
            <li><Link label="Home" path="/" /></li>
            <li><Link label="Service" path="/service" /></li>
            <li><Link label="Contact" path="/contact" /></li>
            <li><Link label="Unknown" path="/wrong-path" /></li>
         </ul>
         <Route path='/' render={Home} />
         <Route path='/about' render={About} />
         <Route path='/service' render={Service} />
         <Route path='/contact' render={Contact} />
         <Route render={ErrorPage} />
      </div>
   )
}

```

### Link Component

```jsx

const LinkComp = ({children, ...props}) => <div>{children}</div>

<Link 
  label="Home"
  href="/"
  noHref={true}
  component={LinkComp}
/>

<Link 
  href="/"
  noHref={true}
  component={LinkComp}
>Children</Link>

```

### Route Component

```jsx

const LinkComp = ({children, ...props}) => <div>{children}</div>

const Render = ({params, query}) => <div>Rendered</div>

<Route 
  path="posts/:id"
  render={Render}
/>


```



### Router
Navigate Page without `Link` Component

```js
import {Router} from 'react-pagex'

Router.go('/path')
Router.back()
Router.forward()
Router.reload()

```



### useMatch

```js
const App = () => {
  const option = useMatch('/path')
  if(option){
    const {params, query} = option
    return <div>Router Match</div> 
  }
  return <></>
}

```

### useInvaid
this is for invalid route. you can use it to show the 404 page
```js
const App = () => {
  const isInvalid = useInvalid()
  return isInvalid ? <div>404 Page</div> : <></>
}

```



### useParams
Just get the params for the current route


### useQuery
Just get the current route query with an object


### Parser
The `Parser` is a module for match and parse the route
```js
const option = Parser.isMatch('/path/:id', 'compare path')
const query = Parser.parseQuery(window.location.search)
```