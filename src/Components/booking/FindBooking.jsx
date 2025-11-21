import React, { useState } from 'react';
import { Search, Calendar, Mail, Phone, AlertCircle, CheckCircle, User, MapPin, Hotel, X, CreditCard, Clock, Users, ChevronRight } from 'lucide-react';

export default function FindBooking() {
  const [searchType, setSearchType] = useState('confirmation');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [booking, setBooking] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setBooking(null);
    setLoading(true);

    try {
      let url = '';
      if (searchType === 'confirmation') {
        url = `http://localhost:8080/bookings/confirmation/${searchValue}`;
      } else {
        url = `http://localhost:8080/bookings/email/${searchValue}`;
      }

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setBooking(data);
      } else {
        setError('Booking not found. Please check your information and try again.');
      }
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getBookingStatus = (booking) => {
    const today = new Date();
    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);

    if (booking.status === 'CANCELLED') {
      return { 
        label: 'Cancelled', 
        color: 'text-red-600', 
        bgColor: 'bg-red-100',
        borderColor: 'border-red-300'
      };
    }
    if (checkOut < today) {
      return { 
        label: 'Completed', 
        color: 'text-gray-600', 
        bgColor: 'bg-gray-100',
        borderColor: 'border-gray-300'
      };
    }
    if (checkIn <= today && checkOut >= today) {
      return { 
        label: 'Active', 
        color: 'text-blue-600', 
        bgColor: 'bg-blue-100',
        borderColor: 'border-blue-300'
      };
    }
    return { 
      label: 'Confirmed', 
      color: 'text-green-600', 
      bgColor: 'bg-green-100',
      borderColor: 'border-green-300'
    };
  };

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl mb-4 shadow-2xl">
            <Search className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Booking</span>
          </h1>
          <p className="text-xl text-gray-600">Enter your details to view your reservation</p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-200">
          {/* Toggle Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button
              onClick={() => {
                setSearchType('confirmation');
                setSearchValue('');
                setError('');
                setBooking(null);
              }}
              className={`py-4 px-6 rounded-xl font-semibold transition-all shadow-md ${
                searchType === 'confirmation'
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Confirmation Code
              </div>
            </button>
            <button
              onClick={() => {
                setSearchType('email');
                setSearchValue('');
                setError('');
                setBooking(null);
              }}
              className={`py-4 px-6 rounded-xl font-semibold transition-all shadow-md ${
                searchType === 'email'
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-center">
                <Mail className="h-5 w-5 mr-2" />
                Email Address
              </div>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-2xl p-5 flex items-start animate-shake">
              <AlertCircle className="h-6 w-6 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-red-800">{error}</p>
                <p className="text-xs text-red-600 mt-1">Please verify your information and try again</p>
              </div>
            </div>
          )}

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-6">
            {searchType === 'confirmation' ? (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                  Confirmation Code
                </label>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
                  placeholder="e.g., PS2024-ABC123"
                  required
                  className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase font-mono text-lg transition-all"
                />
                <p className="mt-3 text-sm text-gray-500 flex items-center bg-blue-50 p-3 rounded-lg">
                  <Mail className="h-4 w-4 mr-2 text-blue-600" />
                  Check your confirmation email for the booking code
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-blue-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg"
                />
                <p className="mt-3 text-sm text-gray-500 flex items-center bg-blue-50 p-3 rounded-lg">
                  <User className="h-4 w-4 mr-2 text-blue-600" />
                  Enter the email address used during booking
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-5 px-6 rounded-xl hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg flex items-center justify-center shadow-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Search Booking
                  <ChevronRight className="h-5 w-5 ml-2" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Booking Results */}
        {booking && (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeIn border border-gray-200">
            {/* Success Banner */}
            <div className="bg-gradient-to-r from-blue-600 via-green-600 px-8 py-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
              
              <div className="relative flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="bg-white bg-opacity-20 p-4 rounded-2xl mr-4 backdrop-blur-sm shadow-2xl">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-white">
                    <h2 className="text-3xl font-bold mb-1">Booking Found!</h2>
                    <p className="text-blue-100 font-mono text-lg">
                      #{booking.bookingConfirmationCode}
                    </p>
                  </div>
                </div>
                {/* Status Badge */}
                <div className={`px-5 py-3 rounded-xl text-sm font-bold shadow-lg ${getBookingStatus(booking).bgColor} ${getBookingStatus(booking).color} border-2 ${getBookingStatus(booking).borderColor}`}>
                  {getBookingStatus(booking).label}
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Room Preview Card */}
              <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl border-2 border-blue-200">
                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl h-20 w-20 flex items-center justify-center shadow-xl">
                      <Hotel className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {booking.room?.roomType || 'Deluxe Suite'}
                      </h3>
                      <p className="text-gray-600 flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-blue-600" />
                        PerfectStay Hotel, Cebu
                      </p>
                    </div>
                  </div>
                  <div className="text-center md:text-right bg-white rounded-xl p-4 shadow-md">
                    <p className="text-sm text-gray-600 font-semibold mb-1">Total Amount</p>
                    <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                      ${booking.totalPrice?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stay Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Check-in */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-blue-500">
                  <div className="flex items-center text-blue-600 mb-3">
                    <Calendar className="h-6 w-6 mr-2" />
                    <span className="text-sm font-bold uppercase">Check-in</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 mb-2">{formatDate(booking.checkInDate)}</p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    After 3:00 PM
                  </p>
                </div>

                {/* Check-out */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-green-500">
                  <div className="flex items-center text-green-600 mb-3">
                    <Calendar className="h-6 w-6 mr-2" />
                    <span className="text-sm font-bold uppercase">Check-out</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 mb-2">{formatDate(booking.checkOutDate)}</p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Before 11:00 AM
                  </p>
                </div>

                {/* Duration */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 ">
                  <div className="flex items-center mb-3">
                    <Hotel className="h-6 w-6 mr-2" />
                    <span className="text-sm font-bold uppercase">Duration</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 mb-2">
                    {calculateNights(booking.checkInDate, booking.checkOutDate)} Night{calculateNights(booking.checkInDate, booking.checkOutDate) !== 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {booking.numOfAdults + booking.numOfChildren} Guest{(booking.numOfAdults + booking.numOfChildren) !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Guest Information */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 mb-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="h-6 w-6 mr-2 text-blue-600" />
                  Guest Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <div className="flex items-start bg-white p-4 rounded-xl shadow-sm">
                      <User className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Full Name</p>
                        <p className="text-lg font-bold text-gray-900">{booking.guestFullName}</p>
                      </div>
                    </div>
                    <div className="flex items-start bg-white p-4 rounded-xl shadow-sm">
                      <Mail className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Email Address</p>
                        <p className="text-lg font-bold text-gray-900 break-all">{booking.guestEmail}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="flex items-start bg-white p-4 rounded-xl shadow-sm">
                      <Phone className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Phone Number</p>
                        <p className="text-lg font-bold text-gray-900">{booking.guestPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-start bg-white p-4 rounded-xl shadow-sm">
                      <Users className="h-5 w-5 text-orange-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Guests</p>
                        <p className="text-lg font-bold text-gray-900">
                          {booking.numOfAdults} Adult{booking.numOfAdults !== 1 ? 's' : ''}
                          {booking.numOfChildren > 0 && `, ${booking.numOfChildren} Child${booking.numOfChildren !== 1 ? 'ren' : ''}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cancellation Section */}
              {booking.status !== 'CANCELLED' && new Date(booking.checkInDate) > new Date() && (
                <div className="mb-6">
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-6 w-6 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-base font-bold text-yellow-900 mb-1">Cancellation Policy</p>
                        <p className="text-sm text-yellow-800">
                          Free cancellation available up to 24 hours before check-in. After that, cancellation fees may apply.
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-red-600 text-white py-4 px-6 rounded-xl hover:bg-red-700 transition-all font-bold shadow-lg flex items-center justify-center">
                    <X className="h-5 w-5 mr-2" />
                    Cancel This Booking
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="border-2 border-blue-600 text-blue-600 py-4 px-6 rounded-xl hover:bg-blue-50 transition-all font-bold flex items-center justify-center shadow-md">
                  <CreditCard className="h-5 w-5 mr-2" />
                  View Receipt
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all font-bold flex items-center justify-center shadow-lg">
                  <Mail className="h-5 w-5 mr-2" />
                  Email Confirmation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Information Card */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 via-green-600 to-gray-600 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative flex flex-col md:flex-row items-start justify-between gap-6">
            <div>
              <h3 className="text-3xl font-bold mb-6 flex items-center">
                <MapPin className="h-8 w-8 mr-3" />
                Need Help?
              </h3>
              <div className="space-y-3 text-blue-100">
                <p className="font-bold text-white text-xl">PerfectStay Hotel</p>
                <p className="text-lg">123 Paradise Boulevard, Cebu City</p>
                <p className="flex items-center text-lg">
                  <Phone className="h-5 w-5 mr-2" />
                  +1 (234) 567-8900
                </p>
                <p className="flex items-center text-lg">
                  <Mail className="h-5 w-5 mr-2" />
                  support@perfectstay.com
                </p>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-2xl backdrop-blur-sm shadow-2xl">
              <Clock className="h-16 w-16 text-white" />
              <p className="text-sm mt-3 text-blue-100 font-semibold">Available 24/7</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}