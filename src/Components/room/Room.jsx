import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import RoomCard from "./RoomCard";
import { User, Calendar } from "lucide-react";

// ------------------------------------------------
// MOCK DATA (Frontend only, no backend required)
// ------------------------------------------------
const mockHotels = [
  {
    hotelId: 1,
    name: "Cebu Seaside Hotel",
    address: "South Road Properties, Cebu City",
    description: "A relaxing Cebu hotel near the seaside with modern rooms.",
    imageUrl:
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb21002?q=80&w=1200",

    rooms: [
      {
        roomId: 101,
        roomType: "Standard Room",
        capacity: 2,
        pricePerNight: 2500,
        images: [
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200",
        ],
      },
      {
        roomId: 102,
        roomType: "Deluxe Room",
        capacity: 3,
        pricePerNight: 3500,
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200",
        ],
      },
      {
        roomId: 103,
        roomType: "Suite Room",
        capacity: 4,
        pricePerNight: 5500,
        images: [
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200",
        ],
      },
    ],
  },

  {
    hotelId: 2,
    name: "Marco Polo Cebu",
    address: "Nivel Hills, Cebu City",
    description: "Luxury hillside hotel with premium rooms.",
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200",

    rooms: [
      {
        roomId: 201,
        roomType: "Premier Room",
        capacity: 2,
        pricePerNight: 4200,
        images: [
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200",
        ],
      },
      {
        roomId: 202,
        roomType: "Executive Suite",
        capacity: 4,
        pricePerNight: 8000,
        images: [
          "https://images.unsplash.com/photo-1501117716987-c8e1ecb21002?q=80&w=1200",
        ],
      },
    ],
  },
];

export default function Room() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [guestCount, setGuestCount] = useState(1);

  // Load hotel from mock data
  useEffect(() => {
    const foundHotel = mockHotels.find(
      (h) => h.hotelId === Number(id)
    );

    setHotel(foundHotel || null);
    setLoading(false);
  }, [id]);

  // Auto-select first room
  useEffect(() => {
    if (hotel?.rooms?.length > 0) {
      setSelectedRoom(hotel.rooms[0]);
    }
  }, [hotel]);

  // Reset guests when switching rooms
  useEffect(() => {
    if (selectedRoom) {
      setGuestCount(1);
    }
  }, [selectedRoom]);

  const handleGuestChange = (e) => {
    let value = Number(e.target.value);
    const max = selectedRoom?.capacity || 1;

    if (value < 1) value = 1;
    if (value > max) value = max;

    setGuestCount(value);
  };

  if (loading) return <p className="p-10">Loading rooms...</p>;
  if (!hotel) return <p className="p-10 text-red-500">Hotel not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <main className="max-w-6xl mx-auto px-4 py-10">

        {/* Title */}
        <h1 className="text-4xl font-extrabold">{hotel.name}</h1>
        <p className="text-gray-600 text-lg mb-8">{hotel.address}</p>

        {/* Main Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
          {/* Selected Room Image */}
          <div className="relative lg:col-span-2">
            <img
              src={selectedRoom?.images?.[0] || hotel.imageUrl}
              alt={selectedRoom?.roomType}
              className="w-full h-[520px] object-cover rounded-2xl shadow-xl"
            />

            <div className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-lg text-lg font-bold">
              ₱{selectedRoom?.pricePerNight} / night
            </div>
          </div>

          {/* Booking Panel */}
          <aside className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 space-y-4 max-w-sm w-full mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Reserve Room
            </h2>

            {/* Dates */}
            <CalendarInput />
            <CalendarInput />

            {/* Guests */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-700">Guests</h3>

              <div className="relative mt-2">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="number"
                  value={guestCount}
                  min="1"
                  max={selectedRoom?.capacity || 1}
                  onChange={handleGuestChange}
                  className="w-full border rounded-xl pl-10 p-3"
                />
              </div>
            </div>

            <Link to="/home/checkout-summary">
              <button className="w-full py-3 mt-6 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:opacity-90 transition">
                CONTINUE
              </button>
            </Link>
          </aside>
        </section>

        {/* About */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">About the place</h2>
          <p className="text-gray-600">{hotel.description}</p>
        </section>

        {/* Room Cards */}
        <h2 className="text-2xl font-bold mb-4">Browse All Rooms</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {hotel.rooms.map((room) => (
            <RoomCard
              key={room.roomId}
              id={room.roomId}
              name={room.roomType}
              location={hotel.address}
              image={room.images?.[0]}
              onClick={() => setSelectedRoom(room)}
              className={
                selectedRoom?.roomId === room.roomId
                  ? "ring-2 ring-blue-500"
                  : ""
              }
            />
          ))}
        </div>
      </main>
    </div>
  );
}

// Small calendar component to reduce repetition
function CalendarInput() {
  return (
    <div className="relative">
      <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
      <input
        type="date"
        className="w-full border rounded-xl pl-10 p-3"
      />
    </div>
  );
}
