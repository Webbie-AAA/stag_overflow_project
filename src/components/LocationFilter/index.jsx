import React, { useState } from "react";

export default function LocationFilter({ setLocation }) {
  const [input, setInput] = useState("");
  const [places, setPlaces] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.inaturalist.org/v1/places/autocomplete?q=${input}`,
      );

      if (!response.ok) {
        throw new Error("Failed to search locations");
      }

      const rawData = await response.json();
      setPlaces(rawData.results);
    } catch (error) {
      console.error("Error searching locations:", error);
    }
  }

  function handleSelect(place) {
    setLocation(place.id);
    setInput(place.display_name || place.name);
    setPlaces([]);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a location"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Find Location</button>
      </form>

      {places.map((place) => (
        <button
          key={place.id}
          type="button"
          onClick={() => handleSelect(place)}
        >
          {place.display_name || place.name}
        </button>
      ))}

      <button
        type="button"
        onClick={() => {
          setLocation(null);
          setInput("");
          setPlaces([]);
        }}
      >
        Anywhere
      </button>
    </div>
  );
}
