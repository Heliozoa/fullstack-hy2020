import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
  const updateFilter = (event) => setFilter(event.target.value)

  const Numbers = ({ persons }) => (
    persons
      .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
      .map(p => <div key={p.name}>{p.name} {p.number}</div>)
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form value={filter}>
        <div>
          filter shown with <input onChange={updateFilter} />
        </div>
      </form>
      <h2>add a new</h2>
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
    </div >
  )

}

export default App
