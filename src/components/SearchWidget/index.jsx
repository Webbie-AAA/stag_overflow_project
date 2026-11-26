import React, { useState, useEffect } from "react"
import { SearchForm } from ".."
import SearchFilters from "../SearchFilters"
import { useAPI } from "../../contexts/contexts"

import "../../App.css"

export default function SearchWidget() {

    const { fetchSightings } = useAPI()

    const [searchString, setSearchString] = useState("Deer")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [location, setLocation] = useState(null)
    const [resetSearch, setResetSearch] = useState(0)

    function clearSearch() {
        setSearchString("Deer")
        setStartDate("")
        setEndDate("")
        setLocation(null)
        setResetSearch(prev => prev + 1)
    }

    useEffect(() => {
        fetchSightings(searchString, startDate, endDate, location)
    }, [searchString, startDate, endDate, location, fetchSightings])

    return (
        <div className="search-widget">
            <SearchForm handleSearch={setSearchString} lastSearch={searchString} />
            <SearchFilters 
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                setLocation={setLocation}
                resetSearch={resetSearch}
            />
            <button type="button" className="clear-search" onClick={clearSearch}>Clear Search</button>
        </div>
    )
}
