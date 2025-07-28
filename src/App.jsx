import { useState } from 'react'
import './App.css'
import HomePage from './Pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Admin from './Pages/Admin'
import About from './Pages/About'
import Contact from './Pages/Contact'
import CardDetail from './Pages/CardDetail'

function App() {
  const [userInput, setUserInput] = useState('');
  return (
    <>
      <NavBar userInput={userInput} setUserInput={setUserInput} />
      <main className="max-w-7xl mx-auto px-4 flex-1">
        <Routes>
          <Route path="/" element={<HomePage userInput={userInput} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/restaurants/:id" element={<CardDetail />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
