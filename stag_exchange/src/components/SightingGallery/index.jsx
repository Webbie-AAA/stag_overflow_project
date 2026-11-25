import React from 'react'
import { useAPI } from '../../contexts/contexts'
import SightingCard from '../SightingCard'
import './SightingGallery.css'

export default function SightingGallery({  }) {
    const { data } = useAPI()
  return (
    <div className="sighting-gallery">
        {data.map(observation => <SightingCard observation={observation} /> )}
    </div>
  )
}
