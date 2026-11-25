import React, { useState, useContext, createContext, useCallback } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [favourites, setFavourites] = useState([]);

    const fetchSightings = useCallback(async (searchString, startDate, endDate) => {
        try {
            const params = new URLSearchParams({
                taxon_name: searchString,
                order_by: "observed_on",
                order: "desc",
                photos: "true",
                fields: "id,description,uri,observed_on,time_observed_at,created_at,location,place_guess,positional_accuracy,obscured,geoprivacy,taxon_geoprivacy,taxon.id,taxon.name,taxon.preferred_common_name,taxon.iconic_taxon_name,taxon.rank,taxon.threatened,taxon.native,taxon.introduced,taxon.default_photo.medium_url,taxon.default_photo.license_code,taxon.default_photo.attribution,photos.url,photos.license_code,photos.attribution"
            });

            if (startDate) {
                params.append("d1", startDate);
            }

            if (endDate) {
                params.append("d2", endDate);
            }

            const response = await fetch(
                `https://api.inaturalist.org/v2/observations?${params}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch sightings");
            }

            const rawData = await response.json();
            setData(rawData.results);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    return (
        <ApiContext.Provider
            value={{
                data,
                fetchSightings,
                favourites,
                setFavourites
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export const useAPI = () => useContext(ApiContext);