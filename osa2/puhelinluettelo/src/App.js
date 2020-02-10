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
    personsService.getAll()
      .then(persons => {
        const existing = persons.find(p => p.name === newName)
        if (!existing) {
          const newPerson = { name: newName, number: newNumber }
          personsService.create(newPerson)
            .then(newPerson => {

              updateSuccessMsg(`added ${newPerson.name}`)
              setPersons(persons.concat(newPerson))
            })
            .catch(e => {
              const msg = e.response.data.error
              console.error(msg)
              updateErrorMsg(msg)
            })
        } else {
          const updated = {
            ...existing,
            number: newNumber,
          }
          console.log("updating", existing, "to", updated)
          personsService.update(updated)
            .then(res => {
              const updated = res.data
              const newPersons = persons.filter(p => p.id !== updated.id)
              setPersons([...newPersons, updated])
            })
            .catch(e => {
              const msg = e.response.data.error
              console.error(msg)
              updateErrorMsg(msg)
            })
        }
      })
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
