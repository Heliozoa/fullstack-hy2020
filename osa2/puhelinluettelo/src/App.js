import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const submitName = (event) => {
    event.preventDefault()
    setPersons(persons.concat({ name: newName }))
  }

  const updateName = (event) => {
    setNewName(event.target.value)
  }

  const Numbers = ({ persons }) => {
    return persons.map(p => <div key={p.name}>{p.name}</div>)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form
        value={newName}
        onSubmit={submitName}
        onChange={updateName} >
        <div>
          name: <input />
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
