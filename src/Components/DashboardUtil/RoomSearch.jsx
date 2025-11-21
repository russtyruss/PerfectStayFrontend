import React, { useState } from 'react';
import { Calendar, Users, Bed } from 'lucide-react';

export default function RoomSearch({ onSearch }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [roomType, setRoomType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateDates = () => {
    if (!checkIn || !checkOut) {
      setError('Please select both check-in and check-out dates');
      return false;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      setError('Check-out date must be after check-in date');
      return false;
    }

    return true;
  };

  const handleSearch = async () => {
    setError('');

    if (!validateDates()) return;

    setIsLoading(true);
    try {
      const searchData = { checkIn, checkOut, roomType };
      console.log('Search data ready for API:', searchData);

      if (onSearch) onSearch(searchData);
    } catch {
      setError('An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Check-In */}
        <div className="relative">
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Check-In</label>
          <Calendar className="absolute left-3 top-[43px] text-gray-400 h-5 w-5" />
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {/* Check-Out */}
        <div className="relative">
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Check-Out</label>
          <Calendar className="absolute left-3 top-[43px] text-gray-400 h-5 w-5" />
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
        </div>

        {/* Room Type */}
        <div className="relative">
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Room Type</label>
          <Users className="absolute left-3 top-[43px] text-gray-400 h-5 w-5" />
          <div className="search-item relative flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-3 py-2 shadow-sm">
            <Bed className="w-5 h-5 text-gray-400" />
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-gray-700"
            >
              <option value="">Room Type</option>
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="suite">Suite</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="w-full bg-white -mt-[-1px]">
          <label className="text-sm font-semibold text-transparent mb-1 block select-none">
            Search
          </label>
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition shadow-lg disabled:opacity-50"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-3 rounded-lg text-red-700 font-medium text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
