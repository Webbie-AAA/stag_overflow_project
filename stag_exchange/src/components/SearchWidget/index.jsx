import React, { useState, useEffect } from "react"
import { SearchForm } from "../"
import SearchFilters from "../SearchFilters"
import { useAPI } from "../../contexts/contexts"

export default function SearchWidget() {

    const { fetchSightings } = useAPI()

    const [searchString, setSearchString] = useState("Deer")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    useEffect(() => {
        fetchSightings(searchString, startDate, endDate)
    }, [searchString, startDate, endDate, fetchSightings])

    return (
        <div>
            <SearchForm handleSearch={setSearchString} lastSearch={searchString} />
            <SearchFilters 
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
        </div>
    )
}
