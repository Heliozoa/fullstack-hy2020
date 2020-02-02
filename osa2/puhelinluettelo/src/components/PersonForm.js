import React from 'react'

const PersonForm = ({ newName, submitPerson, updateName, updateNumber }) => (
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
)

export default PersonForm
