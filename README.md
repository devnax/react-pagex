
## React PageX

The `react-pagex` is a very tiny library for manage react app routes. It's very simple to use.



### Availabel Hooks and Components

```js
import {
  Link, 
  useRoute, 
  useGroup, 
  useQuery,
  Navigate, 
  Route, 
  Routes, 
  Parser
} from 'react-pagex'

```




### Useg

```jsx
import {Link, Routes, Route} from 'react-pagex'


const Home = ({params, query}) => {
  return <h1>Home</h1>
}
const About = ({params, query}) => {
  return <h1>About</h1>
}

const Contact = ({params, query}) => {
  return <h1>Contact</h1>
}

export default () => {
   return (
      <Routes
        onError={() => {

        }}
      >
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
      </Routes>
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

// With Children
<Link 
  href="/"
  noHref={true}
  component={LinkComp}
>Children</Link>

```

### Routes Component
`Routes` used the useGroup hook
```jsx
<Routes 
  basepath=""
  onError={() => {

  }}
  onFound={(route) => {

  }}
>
children
</Routes>

```

### Route Component
`Route` used the useRoute hook
```jsx
<Route 
  path="posts/:id"
  render={Render}
/>

```



### Navigate
Navigate Page without `Link` Component

```js
import {Navigate} from 'react-pagex'

Navigate.go('/path')
Navigate.back()
Navigate.forward()
Navigate.reload()

```



### useGroup

```js
const App = () => {
   useGroup({
    basepath: '',
    onError: () => {},
    onFound: () => {},
  })
  
  return <>app</>
}

```


### useRoute

```js
const App = () => {
  const params = useRoute('/path')
  if(params){
    return <div>Route Match</div> 
  }
  return <></>
}

```

### useQuery
Just get the current route query with an object


### Parser
The `Parser` is a module for match and parse the route
```js
const params = Parser.isMatch('/path/:id', 'compare path')
```