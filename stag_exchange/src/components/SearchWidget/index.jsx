import React, { useState, useEffect } from "react"
import { SearchForm } from "../"
import { useAPI } from "../../contexts/contexts"

export default function SearchWidget() {

    const { setData } = useAPI()
    const [searchString, setSearchString] = useState("Deer")

    useEffect(() => {

        async function fetchData() {
            try{
                const response = await fetch(`https://api.inaturalist.org/v2/observations?taxon_name=${searchString}&fields=all`)
                if (!response.ok) {
                    throw new Error("failed to fetch observations")
                }
                const rawData = await response.json()
                setData(rawData.results)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [searchString, setData])

    return (
        <div>
            <SearchForm handleSearch={setSearchString} lastSearch={searchString} />
        </div>
    )
}
