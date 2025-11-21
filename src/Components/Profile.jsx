import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, Award, Hotel, Shield, Star, TrendingUp } from 'lucide-react';

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Paradise Avenue',
    city: 'Cebu City',
    country: 'Philippines',
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setEditing(false);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl mb-4 shadow-2xl">
            <User className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Profile</span>
          </h1>
          <p className="text-xl text-gray-600">Manage your account information and preferences</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-gray-200">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 px-8 py-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative flex flex-col md:flex-row items-center justify-between">
              <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
                <div className="h-24 w-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl mb-4 md:mb-0">
                  <User className="h-12 w-12 text-blue-600" />
                </div>
                <div className="md:ml-6 text-white text-center md:text-left">
                  <h2 className="text-4xl font-bold mb-2">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-blue-100 text-lg flex items-center justify-center md:justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    {profile.email}
                  </p>
                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white bg-opacity-20 text-white">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified Member
                  </div>
                </div>
              </div>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition-all flex items-center font-semibold shadow-lg"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h3>
              <p className="text-gray-600">Update your personal details and contact information</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 transition-all text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 transition-all text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-blue-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-lg"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-green-600" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 transition-all text-lg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-red-600" />
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 transition-all text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 transition-all text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={profile.country}
                  onChange={handleChange}
                  disabled={!editing}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 transition-all text-lg"
                />
              </div>
            </div>

            {editing && (
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all font-semibold flex items-center justify-center"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:from-blue-700 hover:to-green-700 transition-all font-semibold disabled:opacity-50 shadow-lg flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <Hotel className="h-8 w-8 text-blue-600" />
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-1">12</p>
            <p className="text-sm text-gray-600 font-medium">Total Bookings</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-8 w-8 text-green-600" />
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-green-600 mb-1">10</p>
            <p className="text-sm text-gray-600 font-medium">Completed</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-8 w-8 text-green-600" />
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-green-600 mb-1">450</p>
            <p className="text-sm text-gray-600 font-medium">Points</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-8 w-8 text-orange-600" />
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-orange-600 mb-1">2</p>
            <p className="text-sm text-gray-600 font-medium">Upcoming</p>
          </div>
        </div>

        {/* Account Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Information */}
          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all p-6 border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                <Calendar className="h-7 w-7 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">Account Info</h3>
                <p className="text-gray-600">Your membership details</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Member Since</span>
                <span className="font-bold text-gray-900">January 2024</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Account Status</span>
                <span className="font-bold text-green-600 flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 font-medium">Verified</span>
                <span className="font-bold text-blue-600 flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  Yes
                </span>
              </div>
            </div>
          </div>

          {/* Booking Statistics */}
          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all p-6 border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center">
                <Hotel className="h-7 w-7 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">Booking Stats</h3>
                <p className="text-gray-600">Your travel history</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Total Bookings</span>
                <span className="font-bold text-gray-900 text-xl">12</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Completed Stays</span>
                <span className="font-bold text-green-600 text-xl">10</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 font-medium">Upcoming</span>
                <span className="font-bold text-blue-600 text-xl">2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loyalty Rewards Banner */}
        <div className="mt-6 bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center md:col-span-2">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold mb-1">Loyalty Rewards Program</h3>
                <p className="text-blue-100">You're earning points with every stay!</p>
                <div className="mt-2 flex items-center">
                  <Star className="h-4 w-4 text-yellow-300 mr-1" />
                  <Star className="h-4 w-4 text-yellow-300 mr-1" />
                  <Star className="h-4 w-4 text-yellow-300 mr-1" />
                  <Star className="h-4 w-4 text-yellow-300 mr-1" />
                  <Star className="h-4 w-4 text-yellow-300" />
                  <span className="ml-2 text-sm text-blue-100">Gold Member</span>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-6xl font-bold mb-1">450</p>
              <p className="text-blue-100 text-lg">Reward Points</p>
              <button className="mt-3 bg-white text-green-600 px-6 py-2 rounded-xl hover:bg-blue-50 transition-all font-semibold text-sm shadow-lg">
                Redeem Points
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}