import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const RouteLayout = () => {
  return (
    <div>
      <h1>Hello all pages</h1>
      <div>
         <ul>
           <NavLink to='/about'><li className='text-2xl text-white'>Click me</li></NavLink>
         </ul>
       </div>
      <div className='text-amber-400'>
        <Outlet /> {/* this is the route content*/}
      </div>
    </div>
  )
}

export default RouteLayout