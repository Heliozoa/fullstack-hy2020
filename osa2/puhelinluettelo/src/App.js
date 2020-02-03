import React, { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import Success from './components/Success.js'
import Error from './components/Error.js'
import personsService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMsg, setSuccessMsg] = useState(null)
  const [successTimer, setSuccessTimer] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [errorTimer, setErrorTimer] = useState(null)

  useEffect(() => {
    personsService.getAll()
      .then(persons => setPersons(persons))
  }, [])

  const updateSuccessMsg = msg => {
    setSuccessMsg(msg)
    clearTimeout(successTimer)
    const timerId = setTimeout(() => {
      setSuccessMsg(null)
    }, 5000)
    setSuccessTimer(timerId)
  }

  const updateErrorMsg = msg => {
    setErrorMsg(msg)
    clearTimeout(errorTimer)
    const timerId = setTimeout(() => {
      setErrorMsg(null)
    }, 5000)
    setErrorTimer(timerId)
  }

  const submitPerson = (event) => {
    event.preventDefault()
    const search = persons.filter(p => p.name === newName)
    console.log(search)
    if (search.length > 0) {
      const updated = { ...search[0], number: newNumber }
      personsService.update(updated)
        .then(_ => {
          const updatedPersons = persons.map(p => p.id === updated.id ? updated : p)
          setPersons(updatedPersons)
          updateSuccessMsg(`updated ${updated.name}`)
        })
        .catch(err => {
          const updatedPersons = persons.filter(p => p.id !== updated.id)
          setPersons(updatedPersons)
          updateErrorMsg(`Information of ${updated.name} has already been removed from server`)
        })
    } else {
      const newPerson = { name: newName, number: newNumber }
      personsService.create(newPerson)
        .then(newPerson => setPersons(persons.concat(newPerson)))
      updateSuccessMsg(`added ${newPerson.name}`)
    }
  }

  const deleteHandler = (targetPerson) => {
    personsService.remove(targetPerson.id)
      .then(res => {
        const newPersons = persons.filter(person => person.id !== targetPerson.id)
        setPersons(newPersons)
        updateSuccessMsg(`deleted ${targetPerson.name}`)
      })
  }
  const updateName = (event) => setNewName(event.target.value)
  const updateNumber = (event) => setNewNumber(event.target.value)
  const updateFilter = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Success msg={successMsg} />
      <Error msg={errorMsg} />

      <Filter filter={filter} updateFilter={updateFilter} />

      <h3>Add a new</h3>
      <PersonForm newName={newName} submitPerson={submitPerson} updateName={updateName} updateNumber={updateNumber} />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deleteHandler={deleteHandler} />
    </div >
  )
}

export default App
