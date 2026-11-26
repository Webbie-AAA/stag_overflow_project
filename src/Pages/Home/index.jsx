import React from 'react'
import { useAPI } from '../../contexts/contexts'
import { Link } from 'react-router'
import SearchWidget from '../../components/SearchWidget'

export default function Home() {
  const {data} = useAPI()

  if(data.length === 0) return <p>Loading...</p>
  return (
    <>
    <div className='aboutSection'>
      <h1>About</h1>
      <p>Welcome to Stag exchange! This is an application that allows you to find animal sightings by location or name. To search for sightings, <Link to="/explore">explore here</Link></p>
    </div>
      {/* <pre>{JSON.stringify(data[0], null, 2)}</pre> */}
      <div className="stats">
        <h2>{data.length}</h2><p className='textLine'>Sightings</p>
        <h2>{new Set(data.map(o => o.taxon?.id)).size}</h2><p className='textLine'>Species</p>
        <h2>{data.filter(o => o.taxon?.threatened).length}</h2><p className='textLine'>Threatened</p>
      </div>
      <div>
        <p className='sightOfDay'>Sighting of the day!</p>
      </div>
      <div className='dayCard'>
      <img src={data[0].taxon.default_photo.medium_url}></img>
      <ul className='descriptList'>
        <li><strong>taxon name: </strong>{data[0].taxon.name}</li>
        <li><strong>common name: </strong>{data[0].taxon.preferred_common_name}</li>
        <li><strong>location: </strong> {data[0].place_guess ?? 'Unknown location'}</li>
        <li><strong>observed on: </strong> {data[0].observed_on}</li>
      </ul>
      
      </div>

    </>
  )
}