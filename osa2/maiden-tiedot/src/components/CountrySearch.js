import React from 'react'

const CountrySearch = ({ filter, setFilter }) => {
    const updateFilter = (event) => {
        const filter = event.target.value
        setFilter(filter)
    }

    return <form>find countries <input value={filter} onChange={updateFilter} /></form>
}

export default CountrySearch
