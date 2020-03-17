import React from "react";

const Header: React.FC<{ courseName: string }> = ({ courseName }) => {
  return <h1>{courseName}</h1>
}

const Course: React.FC<{ courseName: string, exerciseCount: number }> = ({ courseName, exerciseCount }) => {
  return <p>{courseName} {exerciseCount}</p>
}

type CourseInfo = { name: string, exerciseCount: number };

const Content: React.FC<{ courses: CourseInfo[] }> = ({ courses }) => {
  return <>
    {courses.map(c => <Course courseName={c.name} exerciseCount={c.exerciseCount} />)}
  </>
}

const Total: React.FC<{ courses: CourseInfo[] }> = ({ courses }) => {
  return <p>
    Number of exercises{" "}
    {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
}


const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CourseInfo[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;