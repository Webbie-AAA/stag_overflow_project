import React from 'react'
import { useAPI } from '../../contexts/contexts'
import SearchWidget from '../../components/SearchWidget'

export default function Home() {
  const {data} = useAPI()
  return (
    <>
      <h1>About</h1>
      
      <pre>{JSON.stringify(data[0], null, 2)}</pre>
    </>
  )
}