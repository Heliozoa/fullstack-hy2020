import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
    <h1>{props.name}</h1>
)

const Part = (props) => (
    <p>
        {props.name} {props.count}
    </p>
)

const Content = (props) => (
    <div>
        <Part name={props.part1.name} count={props.part1.exercises} />
        <Part name={props.part2.name} count={props.part2.exercises} />
        <Part name={props.part3.name} count={props.part3.exercises} />
    </div>
)

const Total = (props) => (
    <p>Number of exercises {props.count}</p>
)

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10,
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7,
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14,
    }

    return (
        <>
            <Header name={course} />
            <Content part1={part1} part2={part2} part3={part3} />
            <Total count={part1.exercises + part2.exercises + part3.exercises} />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))