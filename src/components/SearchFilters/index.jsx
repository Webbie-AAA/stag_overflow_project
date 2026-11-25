import DateFilter from "../DateFilter";

export default function SearchFilters({ startDate, endDate, setStartDate, setEndDate, sortBy, setSortBy }) {
    return (
        <div className="search-filters">
            <DateFilter
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
        </div>
    )
}
