import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123123' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const submitPerson = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }
  }

  const updateName = (event) => setNewName(event.target.value)
  const updateNumber = (event) => setNewNumber(event.target.value)

  const Numbers = ({ persons }) => {
    return persons.map(p =>
      <div key={p.name}>{p.name} {p.number}</div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form
        value={newName}
        onSubmit={submitPerson}
      >
        <div>
          name: <input onChange={updateName} />
        </div>
        <div>
          number: <input onChange={updateNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )

}

export default App
