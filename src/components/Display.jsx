import React, { useState, useEffect, useMemo } from 'react';
import Card from './Card.jsx';

const Display = ({ userInput }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all restaurants once on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/getAllRestaurants`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Failed to fetch restaurants');
        const data = await res.json();
        setRestaurants(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Memoized filtered data
  const filteredRestaurants = useMemo(() => {
    if (!userInput) return restaurants;
    return restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(userInput.toLowerCase())
    );
  }, [restaurants, userInput]);

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading restaurants...</div>;
  }
  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }
  if (filteredRestaurants.length === 0) {
    return <div className="p-4 text-center text-gray-500">No restaurants found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {filteredRestaurants.map((res) => (
        <div
          className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-300 bg-white"
          key={res._id}
        >
          <Card restaurant={res} />
        </div>
      ))}
    </div>
  );
};

export default Display;
