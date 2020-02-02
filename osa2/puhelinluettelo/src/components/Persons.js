import React from 'react'

const Persons = ({ persons, filter }) => (
    persons
        .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
        .map(p => <div key={p.name}>{p.name} {p.number}</div>)
)

export default Persons
