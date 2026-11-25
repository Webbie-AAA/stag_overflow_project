import React from "react"

export default function DateFilter({ startDate, endDate, setStartDate, setEndDate }) {
  return (
    <div>
      <label>From:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <label>To:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </div>
  );
}
