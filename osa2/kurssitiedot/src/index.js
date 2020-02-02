import React from 'react'
import ReactDOM from 'react-dom'
import styles from './index.css';

const Header = ({ course }) => (
    <h2>{course.name}</h2>
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
    return <p className='total'>total of {total} exercises</p>
}

const Course = ({ course }) => (
    <>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
)

const Courses = ({ courses }) => (
    courses.map(course => <Course key={course.id} course={course} />)
)

const App = () => {
    const courses = [
        {
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
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <>
            <h1>Web development curriculum</h1>
            <div>
                <Courses courses={courses} />
            </div>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))