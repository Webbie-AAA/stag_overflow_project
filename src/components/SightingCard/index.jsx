import React from "react";
import "./SightingCard.css";
import { useFavourites } from '../../contexts/FavouritesContext'

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
  const { setFavourites } = useFavourites();

  const addFavourite = (newFavourite) => {
    setFavourites((prev) =>
    prev.some((f) => f.id === newFavourite.id) ? prev : [...prev, newFavourite]
  );
};


  const favouriteSpecies = () => {
    if (!observation.taxon) return;

    addFavourite({
        type: 'wildlife',
        id: `wildlife:${observation.taxon.id}`,
        name: observation.taxon.preferred_common_name || observation.taxon.name,
        scientific_name: observation.taxon.name,
        image: observation.taxon.default_photo?.medium_url
    })
  }

  const favouriteLocation = () => {
    if (!observation.location || observation.obscured ) return;

    const [lat, lng] = observation.location.split(',').map(Number);
    addFavourite({
      type: 'location',
      id: `location:${lat},${lng}`,
      name: observation.place_guess,
      lat: lat,
      lng: lng,
      radius: 10
    })

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
      <div className="card-buttons">
        <button onClick={favouriteSpecies}>Favourite species </button>
        <button onClick={favouriteLocation}>Favourite location {'(10km radius)'}</button>
      </div>
      
    </div>
  );
}
