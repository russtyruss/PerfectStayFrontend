import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import AccountDropdown from "../DashboardUtil/AccountDropdown";

//this is the navbar
export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="w-full shadow-md bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo */}
          <div className="text-2xl font-bold">
            <span className="text-blue-600">
              Perfect
            </span>
            <span className="text-black">
              Stay
            </span>
          </div>

          {/* Nav Links */}
          <nav className="flex items-center space-x-8 font-medium">
            <Link 
              to="customer-dashboard" 
              className="text-black hover:text-blue-600 transition"
            >
              Home
            </Link>

            <Link 
              to="find-booking" 
              className="text-black hover:text-blue-600 transition"
            >
              Find Booking
            </Link>

            <div className="text-black hover:text-blue-600 transition">
              <AccountDropdown />
            </div>
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-blue-600 to-green-600 hover:opacity-90 transition font-semibold shadow-md"
          >
            Log out
          </button>
        </div>
      </header>

      {/* Routed Pages */}
      <div className="px-6 py-6">
        <Outlet />
      </div>
    </div>
  );
}
