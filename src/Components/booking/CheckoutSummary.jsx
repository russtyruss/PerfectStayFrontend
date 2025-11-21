import React, { useEffect, useState } from 'react';
import { Calendar, Home, Users, DollarSign, Clock, Mail, Phone, ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function CheckoutSummary() {
  const [booking, setBooking] = useState(null);
  const [room, setRoom] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const saved = sessionStorage.getItem("checkoutBooking");

    if (saved) {
      const data = JSON.parse(saved);
      setBooking(data);
      setRoom(data.room);
    } else {
      // Demo fallback so UI renders
      setBooking({
        checkInDate: "2024-12-20",
        checkOutDate: "2024-12-25",
        numOfAdults: 2,
        numOfChildren: 0,
        guestFullName: "John Doe",
        guestEmail: "john@example.com",
        guestPhone: "+1 234 567 8900",
        totalPrice: 1250,
        nights: 5
      });

      setRoom({
        roomType: "Deluxe Suite",
        roomPrice: 250
      });
    }
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (!booking || !room) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white hover:opacity-90 mb-8 font-semibold transition-all bg-gradient-to-r from-blue-600 to-green-600 px-3 py-2 rounded-lg shadow-md"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Rooms
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Checkout <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Summary</span>
          </h1>
          <p className="text-xl text-gray-600">Review your details before completing your booking</p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* STATUS CARD */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-yellow-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 font-semibold uppercase tracking-wider mb-2">
                  Payment Status
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                  <Clock className="h-4 w-4 mr-2" />
                  Pending Payment
                </div>
              </div>
            </div>

            {/* Room Info */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center">
                  <Home className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">Room Details</h2>
                  <p className="text-gray-600">Your selected room</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700 font-medium">Room Type</span>
                  <span className="text-xl font-bold text-gray-900">{room.roomType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Price per Night</span>
                  <span className="text-xl font-bold text-blue-600">${room.roomPrice}</span>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">Stay Dates</h2>
                  <p className="text-gray-600">Check-in & check-out</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 rounded-xl p-5 border-l-4 border-green-500">
                  <p className="text-sm text-gray-600 font-semibold mb-1">Check-in</p>
                  <p className="text-lg font-bold text-gray-900">{formatDate(booking.checkInDate)}</p>
                </div>

                <div className="bg-orange-50 rounded-xl p-5 border-l-4 border-orange-500">
                  <p className="text-sm text-gray-600 font-semibold mb-1">Check-out</p>
                  <p className="text-lg font-bold text-gray-900">{formatDate(booking.checkOutDate)}</p>
                </div>

                <div className="bg-green-50 rounded-xl p-5 border-l-4 border-green-500">
                  <p className="text-sm text-gray-600 font-semibold mb-1">Total Nights</p>
                  <p className="text-lg font-bold text-gray-900">{booking.nights}</p>
                </div>
              </div>
            </div>

            {/* Guest Info */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-green-600 to-pink-600 rounded-2xl flex items-center justify-center">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">Guest Information</h2>
                  <p className="text-gray-600">Contact & stay details</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div className="flex items-center py-3 border-b border-gray-200">
                  <Users className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Guest Name</p>
                    <p className="text-lg font-bold text-gray-900">{booking.guestFullName}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center py-3 border-b border-gray-200">
                  <Mail className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Email Address</p>
                    <p className="text-lg font-semibold text-gray-900">{booking.guestEmail}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center py-3 border-b border-gray-200">
                  <Phone className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <p className="text-lg font-semibold text-gray-900">{booking.guestPhone}</p>
                  </div>
                </div>

                {/* Guests */}
                <div className="flex items-center py-3">
                  <Users className="h-5 w-5 text-orange-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Number of Guests</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {booking.numOfAdults} Adults, {booking.numOfChildren} Children
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — PRICE SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-4 border border-gray-200">

              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div className="ml-3">
                  <h3 className="text-xl font-bold text-gray-900">Payment Summary</h3>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Room Rate</span>
                  <span className="font-semibold text-gray-900">${room.roomPrice}/night</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Number of Nights</span>
                  <span className="font-semibold text-gray-900">{booking.nights}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">${booking.totalPrice}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span className="font-semibold text-green-600">Included</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 border-2 border-green-200 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total to Pay</span>
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                    ${booking.totalPrice}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/home/checkout")}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all"
              >
                Proceed to Payment
              </button>

            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/home")}
            className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-800 rounded-xl hover:bg-gray-50 transition-all font-semibold shadow-lg"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
