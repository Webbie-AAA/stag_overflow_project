import React, { useState, useContext, useEffect } from 'react'
import { useFavourites } from '../../contexts/FavouritesContext';
import FeedCard from '../FeedCard'
import { useAPI } from '../../contexts/contexts';

export default function FavouritesData() {
    const { favourites } = useFavourites()
    const { fetchObservations } = useAPI()
    const [feed, setFeed] = useState([])

    useEffect(() => {
        const loadFeed = async () => {
            try {
                const results = await Promise.all(favourites.map((fave) => fetchObservations(fave)))
                setFeed(results.flat())

            } catch (error) {
                console.log(error.message)

            }
        }
        loadFeed();
    }, [favourites])
    console.log(favourites)
    console.log(feed)

    return (
        <>

        
            <div className="feed">
                {feed.map((obj) => (
                    <FeedCard
                        key={obj.id}
                        image={obj.photos?.[0]?.url.replace("square", "medium")}
                        name={obj.species_guess}
                        location={obj.place_guess}
                   
                    />
                ))}


            </div>


        </>
    )

}

