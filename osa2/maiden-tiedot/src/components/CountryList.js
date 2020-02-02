import React, { useState, useEffect } from 'react'

const Country = ({ country }) => {
    return (
        <>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>populaton {country.population}</div>
            <h3>languages</h3>
            <ul>
                {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
            </ul>
            <img style={{ height: 128 }} src={country.flag} alt='flag' />
        </>
    )
}

const CountryList = ({ filtered }) => {
    const [selected, setSelected] = useState(null)

    const showCountry = (country) => {
        setSelected(country)
    }

    // reset selected when filter changes
    useEffect(() => {
        setSelected(null)
    }, [filtered])

    if (selected) {
        return <Country country={selected} />
    } else if (filtered.length < 1) {
        return <div>No countries matched the filter.</div>
    } else if (filtered.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if (filtered.length === 1) {
        return <Country country={filtered[0]} />
    } else {
        return filtered.map(f =>
            <div key={f.name}>{f.name} <button onClick={() => showCountry(f)}>show</button></div>
        )
    }
}

export default CountryList
