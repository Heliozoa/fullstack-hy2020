import React, { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  }, [])

  const submitPerson = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { name: newName, number: newNumber }
      axios.post('http://localhost:3001/persons', newPerson)
      setPersons(persons.concat(newPerson))
    }
  }

  const updateName = (event) => setNewName(event.target.value)
  const updateNumber = (event) => setNewNumber(event.target.value)
  const updateFilter = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} updateFilter={updateFilter} />

      <h3>Add a new</h3>
      <PersonForm newName={newName} submitPerson={submitPerson} updateName={updateName} updateNumber={updateNumber} />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div >
  )
}

export default App
