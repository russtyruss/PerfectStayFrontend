import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // FRONTEND ONLY → always register
    alert('Registration successful!');
    navigate('/'); // go back to login
  };

  return (
    <div className="flex h-screen w-full font-poppins bg-[#1c1c1c]">

      {/* Left panel */}
      <div
        className="flex-1 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80')`,
        }}
      >
        <div className="bg-white/60 backdrop-blur-md border-4 border-hotelBlue rounded-2xl w-[80%] h-[70%] flex items-center justify-center">
          <h1 className="text-5xl font-bold text-[#0d1954]">PerfectStay</h1>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 bg-[#f5f5f5] flex items-center justify-center">
        <div className="w-3/4 max-w-[400px] flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="w-full">

            <label className="font-medium mb-1 block text-black">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 mb-5 rounded-lg border-2 border-gray-300 text-lg focus:border-hotelBlue outline-none"
            />

            <label className="font-medium mb-1 block text-black">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-5 rounded-lg border-2 border-gray-300 text-lg focus:border-hotelBlue outline-none"
            />

            <label className="font-medium mb-1 block text-black">Phone Number</label>
            <input
              type="text"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 mb-5 rounded-lg border-2 border-gray-300 text-lg focus:border-hotelBlue outline-none"
            />

            <label className="font-medium mb-1 block text-black">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-6 rounded-lg border-2 border-gray-300 text-lg focus:border-hotelBlue outline-none"
            />

            <button
              type="submit"
              className="w-full px-4 py-2 rounded-xl text-white bg-gradient-to-r from-blue-600 to-green-600 hover:opacity-90 transition font-semibold shadow-md text-lg"
            >
              Register
            </button>

            <p className="text-center mt-5">
              <Link to="/" className="underline text-black font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
