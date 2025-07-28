import React, { use, useEffect, useState } from 'react'
import { useUser, SignInButton, SignedOut } from '@clerk/clerk-react'
import RatingModal from './RatingModal'
import { useNavigate } from 'react-router-dom'

const Card = ({ restaurant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isSignedIn } = useUser()
  // const [NoOfReviews, setNoOfReviews] = useState(0)

  const navigate = useNavigate();

  const handleRateClick = () => {
    // console.log(restaurant.averageRating, restaurant.numReviews);
    if (!isSignedIn) {
      document.getElementById('clerk-sign-in').click()
      return
    }

    setIsModalOpen(true)
  }

  const displayRating = () => {
    if (!isSignedIn) {
      document.getElementById('clerk-sign-in').click()
      return
    }

    navigate(`/restaurants/${restaurant._id}`)
  }


  
  const handleRatingSubmit = async ({ rating, comment }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/review/${restaurant._id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, comment }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit rating')
      }

      const data = await response.json()
      console.log('Rating submitted successfully:', data)
     
    } catch (error) {
      console.error('Error submitting rating:', error)
    }
  }

  return (
    <div className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-300 bg-white overflow-hidden" >
      <div className="group cursor-pointer">
        <img
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          src={restaurant.image}
          alt={restaurant.name}
        />
      </div>
      <div className="p-4 text-gray-600 text-sm">
        <p className="mb-1">{restaurant.cuisine}</p>
        <p
          className="text-gray-800 font-semibold text-lg truncate mb-2 hover:text-blue-600 cursor-pointer"
          onClick={displayRating}
        >
          {restaurant.name}
        </p>

        <div className="flex items-center gap-1 mb-3">
          {Array(5).fill('').map((_, i) =>
            restaurant.averageRating > i ? (
              <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none">
                <path
                  d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z"
                  fill="#615fff"
                />
              </svg>
            ) : (
              <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none">
                <path
                  d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z"
                  fill="#615fff"
                  fillOpacity="0.35"
                />
              </svg>
            )
          )}
          <p>({restaurant.averageRating})</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-indigo-600 font-semibold">{restaurant.location}</p>
          <button
            className="flex items-center gap-1 bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-700 transition"
            onClick={handleRateClick}
          >
            Rate
          </button>
        </div>
      </div>

      <RatingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRatingSubmit}
        restaurant={restaurant}
      />

      <SignedOut>
        <SignInButton mode="modal">
          <button id="clerk-sign-in" style={{ display: 'none' }} />
        </SignInButton>
      </SignedOut>
    </div>
  )
}

export default Card
