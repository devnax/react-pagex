import * as React from 'react';
import { Navigate, Link, Route, Routes } from '../src'


const Child = () => {
   return <h1>Child</h1>
}

const ChildA = () => {
   return <h1>ChildA</h1>
}

const ChildB = () => {
   return <h1> ChildB</h1>
}

const ChildGroup = () => {
   return (
      <Routes>
         <li><Link label="About A" href="/about/a" /></li>
         <li><Link label="About B" href="/about/b" /></li>

         <Route path='/about' render={Child} />
         <Route path='/about/a' render={ChildA} />
         <Route path='/about/b' render={ChildB} />
      </Routes>
   )
}

const Home = () => {
   return <h1>Home</h1>
}
const About = () => {
   return <>
      <h1>Childs</h1>
      <ChildGroup />
   </>
}
const Service = () => {
   return <h1>Service</h1>
}

const Contact = () => {
   return <h1>Contact</h1>
}

export default () => {
   return (
      <Routes>
         <ul>
            <li><Link label="Home" href="/" /></li>
            <li onClick={() => Navigate.go("/asd/" + Math.random())}>ASD</li>
            <li onClick={() => Navigate.go("/about")}>About</li>
            <li onClick={() => Navigate.back()}>Back</li>
            <li onClick={() => Navigate.forward()}>Forward</li>
            <li><Link label="Service" href="/service" /></li>
            <li><Link label="Contact" href="/contact" /></li>
            <li><Link label="Unknown" href="/asdads" /></li>
         </ul>
         <Route path='/' render={Home} />
         <Route path='/about/(.*)?' render={About} />
         <Route path='/service' render={Service} />
         <Route path='/contact' render={Contact} />
      </Routes>
   )
}