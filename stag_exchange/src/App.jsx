import './App.css'
import {Home, Browse, Explore, Favourites} from './Pages/index'
import {Route, Routes} from 'react-router'
import { NavBar } from './components'
import { useEffect, useState } from 'react';
import { ApiProvider } from './contexts/contexts';



function App() {
  


  return(
    <>
    <ApiProvider>

      <Routes>
        <Route path='/' element={<NavBar/>}>
          <Route index element={<Home/>}/>

          <Route path='/explore' element={<Explore/>}></Route>
          <Route path='/browse' element={<Browse/>}></Route>
          <Route path='/favourites' element={<Favourites/>}></Route>



        </Route>
      </Routes>
    </ApiProvider>
    </>
  )
}

export default App
