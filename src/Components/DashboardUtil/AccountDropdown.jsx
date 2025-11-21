import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AccountDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/*  Click instead of hover */}
      <span
        onClick={() => setOpen(!open)}
        className="text-black font-medium hover:text-blue-300 cursor-pointer select-none"
      >
        Account ▾
      </span>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <Link to="bookings" className="block px-4 py-2 hover:bg-gray-100 text-gray-800">
            My Bookings
          </Link>
          <Link to="booking-summary" className="block px-4 py-2 hover:bg-gray-100 text-gray-800">
            Booking Summary
          </Link>
          <Link to="checkout" className="block px-4 py-2 hover:bg-gray-100 text-gray-800">
            Checkout
          </Link>
          <Link to="booking-success" className="block px-4 py-2 hover:bg-gray-100 text-gray-800">
            Booking Success
          </Link>
          <Link to="profile" className="block px-4 py-2 hover:bg-gray-100 text-gray-800">
            Profile
          </Link>
        </div>
      )}
    </div>
  );
}
