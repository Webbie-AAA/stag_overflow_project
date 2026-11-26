import "./App.css";
import {
  Home,
  Browse,
  Explore,
  Favourites,
  SightingDetails,
} from "./Pages/index";
import { Route, Routes } from "react-router";
import { NavBar } from "./components";
import { useEffect, useState } from "react";
import { ApiProvider } from "./contexts/contexts";
import { FavouritesProvider } from "./contexts/FavouritesContext";

function App() {
  return (
    <>
      <ApiProvider>
        <FavouritesProvider>
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route index element={<Home />} />
              <Route path="/explore" element={<Explore />}></Route>
              <Route path="/explore/:id" element={<SightingDetails />}></Route>
              <Route path="/favourites" element={<Favourites />}></Route>
            </Route>
          </Routes>
        </FavouritesProvider>
      </ApiProvider>
    </>
  );
}

export default App;
