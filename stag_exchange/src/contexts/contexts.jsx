import React, { useState, useEffect, useContext, createContext } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState([]); 

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://api.inaturalist.org/v2/observations?fields=id,description,uri,observed_on,time_observed_at,created_at,location,place_guess,positional_accuracy,obscured,geoprivacy,taxon_geoprivacy,taxon.id,taxon.name,taxon.preferred_common_name,taxon.iconic_taxon_name,taxon.rank,taxon.threatened,taxon.native,taxon.introduced,taxon.default_photo.medium_url,taxon.default_photo.license_code,taxon.default_photo.attribution,photos.url,photos.license_code,photos.attribution"
      );
      const result = await response.json();
      setData(result.results); 
    }

    getData();
  }, []);

  return (
    <ApiContext.Provider value={{ data }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useAPI = () => useContext(ApiContext);