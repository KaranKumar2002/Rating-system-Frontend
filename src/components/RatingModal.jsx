import React, { useState } from 'react'

const RatingModal = ({ isOpen, onClose, onSubmit, restaurant }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  




  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating.')
      return
    }
    onSubmit({ rating, comment })
    onClose()
    setRating(0)
    setComment('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Rate {restaurant.name}
        </h2>

        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          className="w-full border border-gray-300 rounded p-2 mb-4"
          rows="3"
          placeholder="Add a comment (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default RatingModal
