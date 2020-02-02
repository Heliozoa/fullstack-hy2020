import React from 'react'

const Filter = ({ filter, updateFilter }) => (
    <form value={filter}>
        <div>
            filter shown with <input onChange={updateFilter} />
        </div>
    </form>
)

export default Filter
