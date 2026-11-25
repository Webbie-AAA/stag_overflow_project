import React from "react";
import SightingGallery from "../../components/SightingGallery";
import SearchWidget from "../../components/SearchWidget";
import SightingCard from "../../components/SightingCard";
import { useAPI } from "../../contexts/contexts";

export default function Explore() {
  const {data} = useAPI()
  return (
    <div>
      <SearchWidget />
      <SightingGallery />

    </div>
  );
}
