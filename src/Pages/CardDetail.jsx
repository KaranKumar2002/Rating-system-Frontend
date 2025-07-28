import React, { useEffect, useState, useCallback, memo } from "react";
import { useParams, Link } from "react-router-dom";

// Memoized star rating. Reusable and efficient.
const Stars = memo(({ rating }) => (
  <span className="ml-4 text-yellow-500" aria-label={`${rating} out of 5 stars`}>
    {"★".repeat(rating)}
    {"☆".repeat(5 - rating)}
  </span>
));

function CardDetail() {
  const { id } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
 

  // Fetch card data. UseCallback to avoid re-creating function unnecessarily.
  const fetchCard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your real API endpoint.
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/getreview/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch card details.");
      const data = await response.json();

      // console.log(data.restaurant.image)
      setRestaurant(data.restaurant);
      setReviews(data.reviews);
    } catch (err) {
      setError(err.message || "Unexpected error.");
      setRestaurant(null);
      setReviews(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCard();
  }, [fetchCard]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
        {/* Replace this with a skeleton loader if you wish */}
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 text-lg" role="alert">
        {error}
      </div>
    );

  if (!restaurant || !reviews)
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
        No details found.
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gray-50 font-sans">
      {/* Hero image */}
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden pt-16">
        <img
          src={restaurant.image}
          alt={`Hero shot of ${restaurant.name}`}
          className="w-full h-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow">
            {restaurant.name}
          </h1>
        </div> */}
      </div>
      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="block mb-6 text-blue-600 hover:underline transition"
        >
          &larr; Back to all restaurants
        </Link>
        <h2 className="text-3xl font-semibold mb-4">{restaurant.name}</h2>
        {/* <div className="text-gray-800 mb-12 leading-relaxed">{restaurant.moreInfo}</div> */}
        {/* Reviews Section */}
        <div className="border-t pt-8" aria-labelledby="customer-reviews">
          <h2 id="customer-reviews" className="text-2xl font-semibold mb-4">
            Customer Reviews
          </h2>
          {reviews && reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow rounded-lg p-6 border"
                  aria-label={`Review by ${review.name}`}
                >
                  <div className="flex items-center mb-2">
                    <Stars rating={review.rating} />
                  </div>
                  <p className="text-gray-700">{review.review}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
