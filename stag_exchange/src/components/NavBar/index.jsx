import React from 'react'
import {NavLink, Outlet} from 'react-router'

export default function NavBar() {
  return (
    <>
      <nav>
        <NavLink to='/'> Home </NavLink>
        <NavLink to='/explore'> Explore </NavLink>
        <NavLink to='/browse'> Browse </NavLink>
        <NavLink to='/favourites'> Favorites </NavLink>
      </nav>
      <Outlet/>
    
    
    </>
  )
}
