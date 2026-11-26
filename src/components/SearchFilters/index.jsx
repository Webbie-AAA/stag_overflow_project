import DateFilter from "../DateFilter";
import LocationFilter from "../LocationFilter";

export default function SearchFilters({ startDate, endDate, setStartDate, setEndDate, setLocation, resetSearch }) {
    return (
        <div className="search-filters">
            <LocationFilter key={resetSearch} setLocation={setLocation} />
            <DateFilter
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />

        </div>
    )
}
