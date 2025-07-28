import React, { useEffect, useState } from 'react';
import { useAuth } from "@clerk/clerk-react";
import restaurant_list from '../assets/DumyData.js';

const Admin = () => {
  const { orgRole } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [name, setName] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [location, setLocation] = useState('');
  const [imageFile, setImageFile] = useState(null); // ✅ Only the selected file

  //  Fetch restaurants from backend (or fallback to static if needed)
  useEffect(() => {
    if (orgRole === "org:admin") {
    const fetchData = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/getAllRestaurants`,{
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setRestaurants(data);
    };
    fetchData();
    }
  }, [orgRole,restaurants]);

  //  Handle file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  //  Add restaurant with FormData
  const handleAdd = async () => {
    if (!name || !cuisine || !location || !imageFile) {
      alert("Please fill all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('cuisine', cuisine);
    formData.append('location', location);
    formData.append('image', imageFile);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/addnewRestaurant`, {
        method: 'POST',
        credentials: 'include',
        body: formData, //  Do NOT set Content-Type manually
      });

      const data = await res.json();
      if (res.ok) {
        setRestaurants(prev => [...prev, data.restaurant || data]);
        setName('');
        setCuisine('');
        setLocation('');
        setImageFile(null);
        alert('Restaurant added successfully.');
      } else {
        console.error(data);
        alert(data.error || 'Failed to add restaurant.');
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add restaurant.");
    }
  };

  // ✅ Delete restaurant
  const handleDelete = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/deleteRestaurant/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setRestaurants(prev => prev.filter(r => r._id !== id)); 
      alert('Restaurant deleted successfully.');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {orgRole === "org:admin" ? (
        <>
          <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

          {/* Add form */}
          <div className="mb-8 p-4 border rounded shadow-sm">
            <h2 className="text-2xl mb-4 font-semibold">Add New Restaurant</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Cuisine"
                value={cuisine}
                onChange={e => setCuisine(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border p-2 rounded w-full"
                />
                {imageFile && (
                  <p className="text-sm text-green-600 mt-2">{imageFile.name} selected</p>
                )}
              </div>
            </div>
            <button
              onClick={handleAdd}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Add Restaurant
            </button>
          </div>

          {/* Restaurant list */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">All Restaurants</h2>
            {restaurants.length === 0 ? (
              <p className="text-gray-500">No restaurants found.</p>
            ) : (
              <ul className="space-y-4">
                {restaurants.map(r => (
                  <li
                    key={r._id || r.id || r.name}
                    className="border p-4 rounded flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold">{r.name}</h3>
                      <p className="text-sm text-gray-500">{r.cuisine} — {r.location}</p>
                      {r.image && (
                        <img src={r.image} alt={r.name} className="mt-2 h-10" />
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <h1 className="text-4xl font-bold text-center">Only Admin Can Access</h1>
      )}
    </div>
  );
};

export default Admin;
