import React, { useState, useEffect, useContext, createContext } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState([]); 

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://api.inaturalist.org/v2/observations?fields=all"
      );
      const result = await response.json();
      setData(result.results); 
    }

    getData();
  }, []);

  return (
    <ApiContext.Provider value={{ data, setData }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useAPI = () => useContext(ApiContext);