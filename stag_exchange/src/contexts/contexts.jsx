import React, { useState, useEffect, useContext, createContext } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState([]);
  
  async function fetchSightings(searchString, startDate, endDate) {
    try {
      const params = new URLSearchParams({
        taxon_name: searchString,
        order_by: "observed_on",
        order: "desc",
        photos: "true",
        fields: "all",
      });

      if (startDate) {
        params.append("d1", startDate);
      }
      if (endDate) {
        params.append("d2", endDate);
      }

      const response = await fetch(`https://api.inaturalist.org/v2/observations?${params}`);

      if (!response.ok) {
        throw new Error("Failed to fetch sightings");
      }

      const rawData = await response.json();
      setData(rawData.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <ApiContext.Provider value={{ data, fetchSightings }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useAPI = () => useContext(ApiContext);