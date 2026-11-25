import React from "react";
import "./SightingCard.css";

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
        <button>Favourite this region</button>
        <button>Favourite this species</button>
      </div>
      
    </div>
  );
}
