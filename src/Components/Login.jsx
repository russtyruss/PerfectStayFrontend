import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // FRONTEND ONLY → always log in
    alert('Login successful!');
    navigate('/home/customer-dashboard');
  };

  return (
    <div className="flex h-screen w-full bg-[#1c1c1c]">

      {/* Left Panel */}
      <div
        className="hidden md:flex flex-1 bg-cover bg-center items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80')",
        }}
      >
        <div className="bg-white/60 backdrop-blur-md border-4 border-hotelBlue rounded-2xl w-[80%] h-[70%] flex items-center justify-center">
          <h1 className="text-5xl font-bold text-[#0d1954]">PerfectStay</h1>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 bg-[#f5f5f5] items-center justify-center">
        <div className="w-[80%] max-w-[400px]">
          <h2 className="text-3xl font-bold text-center mb-6 text-black">Login Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="font-medium text-black">Email</label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg text-black
                  focus:border-hotelBlue focus:ring-0"
              />
            </div>

            {/* Password */}
            <div>
              <label className="font-medium text-black">Password</label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg text-black
                  focus:border-hotelBlue focus:ring-0"
              />
            </div>

            <button className="w-full px-4 py-2 rounded-xl text-white bg-gradient-to-r
              from-blue-600 to-green-600 hover:opacity-90 transition font-semibold shadow-md text-lg">
              Login
            </button>

            <p className="text-center mt-2 text-black">
              <Link to="/register" className="underline">Create Account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
