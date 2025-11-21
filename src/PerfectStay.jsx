import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Navbar/Home';
import CustomerDashboard from './Components/CustomerDashboard';
import Room from './Components/room/Room'
import FindBooking from './Components/booking/FindBooking';
import Bookings from './Components/booking/Bookings';
import BookingSummary from './Components/booking/BookingSummary';
import Checkout from './Components/booking/Checkout';
import BookingSucces from './Components/booking/BookingSuccess'
import Profile from './Components/Profile';
import CheckoutSummary from './Components/booking/CheckoutSummary';

export default function PerfectStay() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Parent layout with navbar */}
        <Route path="/home" element={<Home />}>
          <Route index element={<CustomerDashboard />} />  {/* default page */}
          <Route path="customer-dashboard" element={<CustomerDashboard />} />
          <Route path="room/:id" element={<Room />} />
          <Route path="find-booking" element={<FindBooking />} />
          <Route path="bookings" element={<Bookings />}/>
          <Route path="booking-summary"  element={<BookingSummary/>}/>
          <Route path="checkout" element={<Checkout />} />
          <Route path="booking-success"  element={<BookingSucces/>}/>
          <Route path="profile"  element={<Profile/>}/>
          <Route path="checkout-summary"  element={<CheckoutSummary/>}/>
        </Route>
      </Routes>
    </Router>
  );
}
