import React from 'react'
import { FavouritesData, FeedCard } from '../../components/index'
import { Link } from 'react-router'
import MyFavourited from '../MyFavourited'

export default function Favourites() {
  return (
    <>
      <div className="favourites-toolbar">
        <div className="favourites-filters">
        
        </div>

        <div className="favourites-link-box">
          <Link to="/favourites/my-favourited" className="favourites-link">
            MyFavourites
          </Link>
          <small className="favourites-link-note">
            View and manage the species and places you've saved
          </small>
        </div>
      </div>
      

      <FavouritesData />
    </>
  )
}
