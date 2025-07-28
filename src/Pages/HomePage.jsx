import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Display from '../components/Display'
import Card from '../components/Card'

const HomePage = ({ userInput }) => {
  return (
     <>
     <Display userInput={userInput} />
     </>
  )
}

export default HomePage