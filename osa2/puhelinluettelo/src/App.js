import React, { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import personsService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService.getAll()
      .then(persons => setPersons(persons))
  }, [])

  const submitPerson = (event) => {
    event.preventDefault()
    const search = persons.filter(p => p.name === newName)
    console.log(search)
    if (search.length > 0) {
      const updated = { ...search[0], number: newNumber }
      personsService.update(updated)
      const updatedPersons = persons.map(p => p.id === updated.id ? updated : p)
      setPersons(updatedPersons)
    } else {
      const newPerson = { name: newName, number: newNumber }
      personsService.create(newPerson)
        .then(newPerson => setPersons(persons.concat(newPerson)))
    }
  }

  const deleteHandler = (id) => {
    personsService.remove(id)
      .then(res => {
        const newPersons = persons.filter(person => person.id !== id)
        setPersons(newPersons)
      })
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
      <Persons persons={persons} filter={filter} deleteHandler={deleteHandler} />
    </div >
  )
}

export default App
