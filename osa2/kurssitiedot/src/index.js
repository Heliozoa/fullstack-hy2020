import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => (
    <h1>{course.name}</h1>
)

const Part = ({ name, count }) => (
    <p>
        {name} {count}
    </p>
)

const Content = ({ parts }) => (
    parts.map(part => <Part key={part.name} name={part.name} count={part.exercises} />)
)

const Total = ({ parts }) => {
    const total = parts.reduce((acc, val) => (acc + val.exercises), 0)
    return <p>Number of exercises {total}</p>
}

const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        id: 1,
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))