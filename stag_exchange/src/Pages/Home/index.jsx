import React from 'react'
import { useAPI } from '../../contexts/contexts'

export default function Home() {
  const {data} = useAPI()
  return (
    <>
      <h1>Sightings: {data.length}</h1>
      <pre>{JSON.stringify(data[0], null, 2)}</pre>
    </>
  )
}
