import React from 'react'
import {NavLink, Outlet} from 'react-router'

export default function NavBar() {
  return (
    <>
      <nav>
        <h1 className='title'>Stag exchange</h1>
        <ul className='navLinks'>
          <NavLink to='/'> Home </NavLink>
          <NavLink to='/explore'> Explore </NavLink>
          <NavLink to='/browse'> Browse </NavLink>
          <NavLink to='/favourites'> Favorites </NavLink>
        </ul>
      </nav>
      <Outlet/>
    
    
    </>
  )
}
