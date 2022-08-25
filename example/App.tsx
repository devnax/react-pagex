import * as React from 'react';
import { Router, Link, Route, useMatch, useInvalid } from '../src'

const Home = () => {
   return <h1>Home</h1>
}
const About = () => {
   return <h1>About</h1>
}
const Service = () => {
   return <h1>Service</h1>
}

const Contact = () => {
   return <h1>Contact</h1>
}

const Unknown = () => {
   return <h1>404</h1>
}


const MyRoute = () => {
   const option = useMatch('/asd/:id')
   return option ? <h1>Matched {option?.params?.id}</h1> : <></>
}

export default () => {
   return (
      <div>
         <ul>
            <li><Link label="Home" href="/" /></li>
            <li onClick={() => Router.go("/asd/" + Math.random())}>ASD</li>
            <li onClick={() => Router.go("/about")}>About</li>
            <li onClick={() => Router.back()}>Back</li>
            <li onClick={() => Router.forward()}>Forward</li>
            <li><Link label="Service" href="/service" /></li>
            <li><Link label="Contact" href="/contact" /></li>
            <li><Link label="Unknown" href="/asdads" /></li>
         </ul>
         <MyRoute />
         <Route path='/' render={Home} />
         <Route path='/about' render={About} />
         <Route path='/service' render={Service} />
         <Route path='/contact' render={Contact} />
         <Route render={Unknown} />

      </div>
   )
}