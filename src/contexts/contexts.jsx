import React, { useState, useEffect, useContext, createContext, useCallback } from "react";

export const ApiContext = createContext();


const FEED_FIELDS = [
    "id", "uri", "description", "observed_on", "time_observed_at", "created_at",
    "location", "place_guess", "obscured", "quality_grade", "species_guess",
    "user.login", "user.name",
    "taxon.id", "taxon.name", "taxon.preferred_common_name", "taxon.iconic_taxon_name",
    "taxon.rank", "taxon.threatened", "taxon.native", "taxon.introduced",
    "taxon.default_photo.medium_url",
    "photos.url", "photos.attribution",
].join(",");

export const ApiProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [feed, setFeed] = useState([]);
    const [feedLoading, setFeedLoading] = useState(true)

    useEffect(() => {
        async function getFeed() {
            try {
                const params = new URLSearchParams({
                    order_by: "observed_on",
                    order: "desc",
                    photos: "true",
                    per_page: "100",
                    fields: FEED_FIELDS,
                });
                const response = await fetch(
                    `https://api.inaturalist.org/v2/observations?${params}`
                );
                const rawData = await response.json();
                setFeed(rawData.results);
            } finally {
                setFeedLoading(false);
            }
        }
        getFeed();
    }, []);

    const fetchSightings = useCallback(async (searchString, startDate, endDate, location) => {
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

            if (location) {
                params.append("place_id", location);
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

    const fetchObservations = useCallback(async (favourite) => {
        const params = new URLSearchParams({
            order_by: "observed_on",
            order: "desc",
            photos: "true",
            per_page: "10",
            fields: FEED_FIELDS,
        });

        switch (favourite.type) {
            case "wildlife":
                params.set("taxon_name", favourite.scientific_name || favourite.name);
                break;
            case "location":
                params.set("lat", favourite.lat);
                params.set("lng", favourite.lng);
                params.set("radius", favourite.radius); 
                break;
            default:
                return [];
        }

        const response = await fetch(
            `https://api.inaturalist.org/v2/observations?${params}`
        );

        if (!response.ok) {
            throw new Error(`${favourite.name ?? favourite.type}: ${response.status}`);
        }

        const rawData = await response.json();
        return rawData.results;
    }, []);



    return (
        <ApiContext.Provider
            value={{
                data,
                feed,
                feedLoading,
                fetchSightings,
                fetchObservations,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export const useAPI = () => useContext(ApiContext);