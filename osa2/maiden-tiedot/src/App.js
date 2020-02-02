import React, { useState, useEffect } from 'react';
import axios from 'axios'
import CountryList from './components/CountryList'
import CountrySearch from './components/CountrySearch'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filtered, setFiltered] = useState([])

  // update total country list
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  // update filtered list when total country list or filter changes
  useEffect(() => {
    const filtered = countries.filter(c => c.name.toLowerCase().includes(filter))
    setFiltered(filtered)
  }, [countries, filter])

  return <>
    <CountrySearch filter={filter} setFilter={setFilter} />
    <CountryList filtered={filtered} />
  </>
}

export default App;
