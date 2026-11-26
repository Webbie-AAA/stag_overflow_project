import React, { useState, useContext, useEffect } from "react";
import { useFavourites } from "../../contexts/FavouritesContext";
import FeedCard from "../FeedCard";
import { useAPI } from "../../contexts/contexts";
import "../../App.css";

export default function FavouritesData() {
  const { favourites } = useFavourites();
  const { fetchObservations } = useAPI();
  const [feed, setFeed] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  console.log("Favourites:", favourites);

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const filteredFavourites = favourites.filter((fave) => {
          if (activeFilter === "all") return true;
          return fave.type === activeFilter;
        });

        const results = await Promise.all(
          filteredFavourites.map((fave) => fetchObservations(fave)),
        );
        setFeed(results.flat());
      } catch (error) {
        console.log(error.message);
      }
    };
    loadFeed();
  }, [favourites, activeFilter, fetchObservations]);

  console.log(feed);

  return (
    <>
      <div className="favourites-filter">
        <button
          className={activeFilter === "all" ? "active" : ""}
          onClick={() => setActiveFilter("all")}
        >
          All favourites
        </button>

        <button
          className={activeFilter === "wildlife" ? "active" : ""}
          onClick={() => setActiveFilter("wildlife")}
        >
          Wildlife
        </button>

        <button
          className={activeFilter === "location" ? "active" : ""}
          onClick={() => setActiveFilter("location")}
        >
          Locations
        </button>
      </div>

      <div className="feed">
        {feed.map((obj) => (
          <FeedCard
            key={obj.id}
            image={obj.photos?.[0]?.url.replace("square", "medium")}
            name={obj.species_guess}
            location={obj.place_guess}
            onRemove={() =>
              setFeed((prev) =>
                prev.filter((removed_obj) => removed_obj.id !== obj.id),
              )
            }
          />
        ))}
      </div>
    </>
  );
}
// "preferred_common_name": "Great Crested Grebe"
// "species_guess": "Great Crested Grebe",
// "created_time_zone": "Europe/London",
// "created_at": "2026-11-25T20:01:58+00:00",
// "updated_at": "2026-11-25T20:02:45+00:00",
// default_photo.medium_url
// Preferred Common Name
