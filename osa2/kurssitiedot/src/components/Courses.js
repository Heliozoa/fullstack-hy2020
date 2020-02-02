import React from 'react'

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
    return <p style={{ fontWeight: 'bold' }}> total of {total} exercises</p >
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

export default Courses
