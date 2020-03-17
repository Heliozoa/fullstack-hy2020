import React from "react";

const Header: React.FC<{ courseName: string }> = ({ courseName }) => {
  return <h1>{courseName}</h1>
}

const Part: React.FC<{ course: CoursePart }> = ({ course }) => {
  switch (course.name) {
    case "Fundamentals":
      return <p>{course.name} {course.description} {course.exerciseCount}</p>
    case "Using props to pass data":
      return <p>{course.name} {course.exerciseCount} {course.groupProjectCount}</p>
    case "Deeper type usage":
      return <p>{course.name} {course.description} {course.exerciseCount} {course.exerciseSubmissionLink}</p>
    default:
      const n: never = course;
      throw new Error(`Unhandled discriminated union member`);
  }
}

const Content: React.FC<{ courses: CoursePart[] }> = ({ courses }) => {
  return <>
    {courses.map(c => <Part course={c} />)}
  </>
}

const Total: React.FC<{ courses: CoursePart[] }> = ({ courses }) => {
  return <p>
    Number of exercises{" "}
    {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDesc extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartDesc {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDesc {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
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