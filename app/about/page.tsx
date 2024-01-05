import React from 'react'

const About = () => {
    console.log(process.env.DATABASE_URL!);
  return (
    <>
    <div>About</div>
    <h1>{process.env.DATABASE_URL}</h1>
    </>
  )
}

export default About