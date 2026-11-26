import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { SightingMap } from "../../components";
import "./SightingPage.css";

export default function SightingPage() {
  const { id } = useParams();
  const [observation, setObservation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.inaturalist.org/v2/observations?id=${id}&fields=all`,
      );
      const data = await response.json();

      setObservation(data.results[0]);
    };

    fetchData();
  }, []);

  if (!observation) {
    return <p>Loading observation...</p>;
  }

  const taxon = observation.taxon;

  let name;
  if (taxon?.preferred_common_name) {
    name = (
      <>
        {taxon.preferred_common_name}
        <span className="scientific-name">{observation.taxon.name}</span>
      </>
    );
  } else if (taxon?.name) {
    name = taxon.name;
  } else {
    name = "Unknown species";
  }


  return (
    <div className="page-container">
      <div className="sighting-container">
        <div className="sighting-name"><h1>{name}</h1></div>
        

        <div className="sighting-photos">
          {observation.photos?.map((photo) => (
            <img
              src={photo.url.replace("/square.", "/large.")}
              alt={taxon?.name}
            />
          ))}
        </div>

        <section className="sighting-information">
        <h2>Sighting Location</h2>
        <SightingMap mapId={`map-${observation.id}`} longitude={observation.geojson.coordinates[0]} latitude={observation.geojson.coordinates[1]} />
        <p>Location: {observation.place_guess}</p>

        {observation.observed_on && (
          <p>
            Observed on{' '}
            {new Date(observation.observed_on).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              timeZone: 'UTC'
            })}

            {observation.time_observed_at && (
              <> at {observation.time_observed_at.slice(11, 16)}</>
            )}
          </p>
        )}

        

        {observation.positional_accuracy != null && !observation.obscured && (
          <p>
            Location accuracy: {observation.positional_accuracy} metres
          </p>
        )}

        {observation.obscured && (
          <p>The exact sighting location is obscured.</p>
        )}
      </section>

      {observation.description && (
        <section className="sighting-description">
          <h2>Observer's notes</h2>
          <p>{observation.description}</p>
        </section>
      )}

      {taxon && (
        <section className="species-information">
          <h2>About the Species</h2>

          <p>Scientific name: {taxon.name}</p>
          <p>Category: {taxon.iconic_taxon_name}</p>
          

          <p>
            Total recorded observations:{' '}
            {taxon.observations_count?.toString()}
          </p>
        <p>Species status:</p>
        <ul>
          <li>Threatened: {taxon.threatened ? '✅' : '❌'}</li>
          <li>Native: {taxon.native ? '✅' : '❌'}</li>
          <li>Introduced: {taxon.introduced ? '✅' : '❌'}</li>
          <li>Endemic: {taxon.endemic ? '✅' : '❌'}</li>
        </ul>

          {taxon.wikipedia_url && (
            <a href={taxon.wikipedia_url} target="_blank">
              Read more on Wikipedia
            </a>
          )}
        </section>
      )}

      

      {observation.user && (
        <div className="observer-information">
          {observation.user.icon_url && (
            <img
              src={observation.user.icon_url}
              className="observer-picture"
            />
          )}
          <p><b>Observed by <a target="_blank" href={`https://www.inaturalist.org/people/${observation.user.login}`}>{observation.user.login}</a></b><br />

      
            User's total observations:{' '}
            {observation.user.observations_count?.toString()}
          </p>
          

          
        </div>
      )}

      
      </div>
    </div>
  );
}
