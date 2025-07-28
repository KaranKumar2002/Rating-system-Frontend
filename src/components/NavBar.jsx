import React, { useState } from 'react'
import { useUser, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useAuth } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const NavBar = ({ userInput, setUserInput }) => {
  const [open, setOpen] = useState(false)
  const { isSignedIn,isLoaded } = useUser()
  


    useEffect(() => {
    const createUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/newUser`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await res.json()
        // console.log('User created successfully', data)
      } catch (error) {
        console.error('Error creating user:', error)
      }
    }

    if (isLoaded && isSignedIn) {
      createUser()
    }
  }, [isLoaded, isSignedIn])


  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-10 py-4 border-b border-gray-300 bg-white relative transition-all">


      <Link to="/" className="text-2xl font-bold text-indigo-500">
        Restaurant Rating System
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search Restaurants"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" onClick={() => console.log(userInput)}>
            <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path clipRule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
              Login
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>

      {/* Hamburger Menu Button */}
      <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden">
        <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
        <Link to="/" className="block">Home</Link>
        <Link to="#">About</Link>
        <Link to="#">Contact</Link>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
              Login
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  )
}

export default NavBar
