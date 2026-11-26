import React, {useState, useContext, useEffect} from 'react'
import { useFavourites } from '../../contexts/FavouritesContext';
import FeedCard from '../FeedCard'

export default function FavouritesData() {
    const [location, setLocation] = useState([])
    const [wildlife, setWildlife] = useState([])
    const {favourites, setFavourites} = useFavourites()

    const mockFavouritesData = [
        {key: 1, 
        type: "wildlife",
        taxa: "black bear"
    },
        {key: 2, 
        type: "location",
        lat: 51.5,
        lng: -0.12,
        radius:10,
    }
    ]

    useEffect(() => {
        setFavourites(mockFavouritesData)
    
}
    
, [setFavourites])


    

    useEffect(() => {
        const taxa = favourites[0]?.taxa

        if (taxa === undefined) return
        
            
            const getWildlifeData = async () => {
         try{
                const response = await fetch(`https://api.inaturalist.org/v1/taxa?q=${taxa}&per_page=25#`) 

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`)}
           
                const result = await response.json()
                setWildlife(result)
            } catch(error){
                console.log(error.message)
            }
            
        }
        getWildlifeData()
       
    
    }, [favourites])
   
    useEffect(()=> {
    
            const lat = favourites[1]?.lat
    
            const lng = favourites[1]?.lng

            const radius = favourites[1]?.radius


            if (lat === undefined || lng === undefined || radius === undefined) return

            

            const getLocationData = async () => {
         try{
            const response = await fetch(`https://api.inaturalist.org/v1/observations?lat=${lat}&lng=${lng}&radius=${radius}&photos=true&quality_grade=research&per_page=25#`)
        
            if (!response.ok){
                throw new Error(`Error: ${response.status}`)
            }

            const result = await response.json()
            setLocation(result)
        
        
        } catch(error){
            console.log(error.message)
        }}
        getLocationData()
    }, [favourites])


    
  
  return (
    <>
        
            {wildlife.results?.map((obj, index) => 
            <div key={index}>
            <h3> {JSON.stringify(obj.preferred_common_name)}</h3>
             <img  src={obj.default_photo?.medium_url} alt='medium sized image .jpg'/>
             <p>Region Spotted: {JSON.stringify(obj.place_guess)}</p>
             <p>Matched your preference for: {obj.matched_term}</p>
             </div>
            )}
          
   
        <ul>
            {location.results?.map((obj, index) => 
            <div key={index}>
            <li> {JSON.stringify(obj)}</li>
            <FeedCard/>
           
            </div>
            )}
          
        </ul>
      
    </>
  )
}
// "preferred_common_name": "Great Crested Grebe"
// "species_guess": "Great Crested Grebe",
// "created_time_zone": "Europe/London",
// "created_at": "2026-11-25T20:01:58+00:00",
// "updated_at": "2026-11-25T20:02:45+00:00",
// default_photo.medium_url
// Preferred Common Name
