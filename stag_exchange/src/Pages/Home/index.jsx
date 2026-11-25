import React from 'react'
import { useAPI } from '../../contexts/contexts'
import SearchWidget from '../../components/SearchWidget'

export default function Home() {
  const {data} = useAPI()
  return (
    <>
      <SearchWidget />
      <h1>Sightings: {data.length}</h1>
      {data.map(sighting => (
        <div key={sighting.id}>
          <h2>{sighting.taxon?.preferred_common_name || sighting.taxon?.name || "Unknown"}</h2>
          {sighting.observation_photos?.[0]?.photo?.url && (
            <img
              src={sighting.observation_photos[0].photo.url}
              alt={sighting.species_guess || "Unknown"}
              style={{ maxWidth: "300px" }}
            />
          )}
          <p>Location: {sighting.place_guess || "Unknown"}</p>
          <p>Date: {sighting.observed_on || "Unknown"}</p>
        </div>
      ))}
    </>
  )
}