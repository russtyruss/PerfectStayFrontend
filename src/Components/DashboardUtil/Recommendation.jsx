import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

// --- Move mock data OUTSIDE the component to avoid ESLint warnings ---
const mockHotels = [
  {
    hotelId: 1,
    name: "Cebu Seaside Hotel",
    location: "South Road Properties, Cebu City",
    lowestPrice: 2500,
    cheapestRoomImage:
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb21002?q=80&w=1200",
  },
  {
    hotelId: 2,
    name: "Marco Polo Cebu",
    location: "Nivel Hills, Cebu City",
    lowestPrice: 4200,
    cheapestRoomImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200",
  },
  {
    hotelId: 3,
    name: "Shangri-La Mactan Resort",
    location: "Punta Engaño, Lapu-Lapu City",
    lowestPrice: 6800,
    cheapestRoomImage:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200",
  },
];

export default function Recommendation() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHotels(mockHotels);
      setLoading(false);
    }, 400);
  }, []); // <-- no more warning!

  return (
    <section className="w-full px-6 py-10">

      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Browse all{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
          rooms
        </span>
      </h2>

      {loading && <p className="text-gray-500">Loading rooms...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">

        {!loading && hotels.length === 0 && (
          <p className="text-gray-500 col-span-full">No hotels found.</p>
        )}

        {!loading &&
          hotels.map((hotel) => (
            <Link
              to={`/home/room/${hotel.hotelId}`}
              key={hotel.hotelId}
              className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100 transition-transform hover:-translate-y-1"
            >
              <img
                src={
                  hotel.cheapestRoomImage ||
                  "https://via.placeholder.com/600x400?text=No+Image"
                }
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h4 className="font-semibold text-lg text-gray-800">
                  {hotel.name}
                </h4>

                <p className="text-gray-500 text-sm mb-2">{hotel.location}</p>

                <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  ₱{hotel.lowestPrice} / night
                </span>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
