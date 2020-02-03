import React from 'react'

const Person = ({ person, deleteHandler }) => {

    return <div>{person.name} {person.number} <button onClick={() => deleteHandler(person.id)}>delete</button></div>
}

const Persons = ({ persons, filter, deleteHandler }) => {

    return persons
        .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
        .map(p => <Person key={p.name} person={p} deleteHandler={deleteHandler} />)
}

export default Persons
