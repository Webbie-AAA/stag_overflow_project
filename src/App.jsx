import './App.css'
import {Home, Browse, Explore, Favourites, SightingDetails, MyFavourited} from './Pages/index'
import {Route, Routes} from 'react-router'
import { NavBar } from './components'
import { useEffect, useState } from 'react';
import { ApiProvider } from './contexts/contexts';
import { FavouritesProvider } from './contexts/FavouritesContext';



function App() {
  return (
    <>
    <ApiProvider>
      <FavouritesProvider>
        <Routes>
          <Route path='/' element={<NavBar/>}>
            <Route index element={<Home/>} />

            <Route path='/explore' element={<Explore/>} />
            <Route path='/explore/:id' element={<SightingDetails/>} />
            <Route path='/browse' element={<Browse/>} />
            <Route path='/favourites' element={<Favourites/>} />
            <Route path='/favourites/my-favourited' element={<MyFavourited/>}/>



          </Route>
        </Routes>
      </FavouritesProvider>
    </ApiProvider>
    </>
  );
}

export default App;
