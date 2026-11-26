import React from 'react'
import { useAPI } from '../../contexts/contexts'
import { Link } from 'react-router'
import SearchWidget from '../../components/SearchWidget'

export default function Home() {
  const {feed, feedLoading} = useAPI()

  if(feedLoading) return <p>Loading...</p>
  return (
    <>
    <div className='aboutSection'>
      <h1>HomePage</h1>
      <p>Welcome to Stag exchange! This is an application that allows you to find animal sightings by location or name. To search for sightings, <Link to="/explore">explore here</Link></p>
    </div>
      {/* <pre>{JSON.stringify(data[0], null, 2)}</pre> */}
      <div className="stats">
        <h2>{feed.length}</h2><p className='textLine'>Sightings</p>
        <h2>{new Set(feed.map(o => o.taxon?.id)).size}</h2><p className='textLine'>Species</p>
        <h2>{feed.filter(o => o.taxon?.threatened).length}</h2><p className='textLine'>Threatened</p>
      </div>
      <div>
        <p className='sightOfDay'>Sighting of the day!</p>
      </div>
      <div className='dayCard'>
      <img src={feed[0].taxon.default_photo.medium_url}></img>
      <ul className='descriptList'>
        <li><strong>taxon name: </strong>{feed[0].taxon.name}</li>
        <li><strong>common name: </strong>{feed[0].taxon.preferred_common_name}</li>
        <li><strong>location: </strong> {feed[0].place_guess ?? 'Unknown location'}</li>
        <li><strong>observed on: </strong> {feed[0].observed_on}</li>
      </ul>
      
      </div>

    </>
  )
}