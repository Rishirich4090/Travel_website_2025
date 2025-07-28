
"use client";
import React from 'react';
import Image from 'next/image';

const UserDashboard = () => {
  const upcomingTrips = [
    { id: 1, destination: 'Paris, France', date: '2025-08-15', duration: '5 days', status: 'confirmed' },
    { id: 2, destination: 'Tokyo, Japan', date: '2025-09-20', duration: '7 days', status: 'pending' },
  ];

  const bookingHistory = [
    { id: 1, destination: 'London, UK', date: '2024-12-10', amount: '$1,800', status: 'completed' },
    { id: 2, destination: 'Rome, Italy', date: '2024-10-05', amount: '$2,200', status: 'completed' },
    { id: 3, destination: 'Barcelona, Spain', date: '2024-08-15', amount: '$1,650', status: 'completed' },
  ];

  const recommendedDestinations = [
    { 
      id: 1, 
      name: 'Santorini, Greece', 
      price: '$2,500', 
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' 
    },
    { 
      id: 2, 
      name: 'Bali, Indonesia', 
      price: '$1,800', 
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' 
    },
    { 
      id: 3, 
      name: 'Dubai, UAE', 
      price: '$3,200', 
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' 
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Traveler!</h1>
          <p className="text-gray-600">Plan your next adventure and manage your bookings</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg shadow-md transition-colors">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Book New Trip</h3>
            <p className="text-blue-100 text-sm">Discover amazing destinations</p>
          </button>
          
          <button className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg shadow-md transition-colors">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">My Bookings</h3>
            <p className="text-green-100 text-sm">View and manage trips</p>
          </button>
          
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg shadow-md transition-colors">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Wishlist</h3>
            <p className="text-purple-100 text-sm">Save favorite destinations</p>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Trips */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Trips</h3>
            {upcomingTrips.length > 0 ? (
              <div className="space-y-4">
                {upcomingTrips.map((trip) => (
                  <div key={trip.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{trip.destination}</h4>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(trip.status)}`}>
                        {trip.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Date: {trip.date}</p>
                    <p className="text-sm text-gray-600">Duration: {trip.duration}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V7a2 2 0 012-2h4a2 2 0 012 2v0M8 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-4m-6 0V7" />
                </svg>
                <p className="text-gray-500">No upcoming trips planned</p>
                <button className="mt-2 text-blue-600 hover:text-blue-800 font-medium">Book your first trip</button>
              </div>
            )}
          </div>

          {/* Booking History */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Trips</h3>
            <div className="space-y-4">
              {bookingHistory.map((booking) => (
                <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{booking.destination}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{booking.date}</span>
                    <span className="font-semibold text-gray-900">{booking.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Destinations */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedDestinations.map((destination) => (
              <div key={destination.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{destination.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">{destination.price}</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
