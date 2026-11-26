import React from "react";
import "./SightingCard.css";
import { useFavourites } from '../../contexts/FavouritesContext'
import { Link } from "react-router";

export default function SightingCard({ observation }) {
  // code to handle naming where common is available
  let name;
  if (observation.taxon?.preferred_common_name) {
    name = (
      <>
        {observation.taxon.preferred_common_name}
        <span className="scientific-name">{observation.taxon.name}</span>
      </>
    );
  } else if (observation.taxon?.name) {
    name = observation.taxon.name;
  } else {
    name = "Unknown species";
  }

  // code to handle image
  let image;

  if (observation.photos?.length > 0) {
    image = observation.photos[0].url.replace("/square.", "/medium.");
  } else {
    image = observation.taxon?.default_photo?.medium_url;
  }

  // code to handle favouriting
  const { favourites, setFavourites } = useFavourites();

  const favouriteSpecies = () => {
    if (!observation.taxon) return;

    const newFavourite = {
        favType: 'wildlife',
        taxonId: observation.taxon.id,
        sciName: observation.taxon.name,
        commonName: observation.taxon.preferred_common_name || observation.taxon.name,
        image: observation.taxon.default_photo?.medium_url
    }
    setFavourites(prev => [...prev, newFavourite])
  }

  const favouriteLocation = () => {
    if (!observation.location || observation.obscured ) return;

    const [latitude, longitude] = observation.location.split(',').map(Number);
    const newFavourite = {
      favType: 'location',
      name: observation.place_guess,
      latitude: latitude,
      longitude: longitude,
      radius: 10
    }

    setFavourites(prev => [...prev, newFavourite])
  }

  return (
    <div className="card-container">
      <h3>{name}</h3>
      <img className="card-image" src={image} />

      <p>
        Observed at {observation.time_observed_at?.slice(11, 16)} on&nbsp;
        {new Date(observation.observed_on).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })}
      </p>
      <p className="location-text">
        {observation.place_guess}
        <br />
        <span className="long-lat">{observation.location}</span>
      </p>
      <Link to={`/explore/${observation.id}`}>See more information</Link>
      <div className="card-buttons">
        <button onClick={favouriteSpecies}>Favourite region {'(10km radius)'}</button>
        <button onClick={favouriteLocation}>Favourite species</button>
      </div>
      
    </div>
  );
}
