"use client";
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/slice/themeSlice';
import Link from 'next/link';

const AdminDashboard = () => {
  const theme = useSelector(selectTheme);

  const stats = [
    { 
      label: 'Total Bookings', 
      value: '2,456', 
      change: '+15%', 
      icon: '📊',
      bgColor: theme.primaryColor || '#3B82F6',
      trend: 'up'
    },
    { 
      label: 'Active Users', 
      value: '1,234', 
      change: '+8%', 
      icon: '👥',
      bgColor: theme.secondaryColor || '#10B981',
      trend: 'up'
    },
    { 
      label: 'Monthly Revenue', 
      value: '$45,678', 
      change: '+12%', 
      icon: '💰',
      bgColor: '#8B5CF6',
      trend: 'up'
    },
    { 
      label: 'Pending Requests', 
      value: '23', 
      change: '-5%', 
      icon: '⏳',
      bgColor: '#F59E0B',
      trend: 'down'
    },
  ];

  const recentBookings = [
    { id: 1, customer: 'John Smith', destination: 'Paris, France', amount: '$2,500', status: 'confirmed', date: '2025-01-15' },
    { id: 2, customer: 'Sarah Johnson', destination: 'Tokyo, Japan', amount: '$3,200', status: 'pending', date: '2025-01-14' },
    { id: 3, customer: 'Mike Wilson', destination: 'London, UK', amount: '$1,800', status: 'confirmed', date: '2025-01-13' },
    { id: 4, customer: 'Emily Brown', destination: 'New York, USA', amount: '$2,100', status: 'processing', date: '2025-01-12' },
    { id: 5, customer: 'David Lee', destination: 'Dubai, UAE', amount: '$2,800', status: 'confirmed', date: '2025-01-11' },
  ];

  const quickActions = [
    { title: 'Manage Bookings', description: 'View and manage all travel bookings', icon: '🎫', href: '/admin/bookings', color: '#3B82F6' },
    { title: 'Travel Packages', description: 'Create and edit travel packages', icon: '🏖️', href: '/admin/packages', color: '#10B981' },
    { title: 'User Management', description: 'Manage user accounts and permissions', icon: '👤', href: '/admin/users', color: '#8B5CF6' },
    { title: 'Analytics', description: 'View detailed analytics and reports', icon: '📈', href: '/admin/analytics', color: '#F59E0B' },
    { title: 'Settings', description: 'Configure system settings and themes', icon: '⚙️', href: '/admin/settings', color: '#EF4444' },
    { title: 'Customer Support', description: 'Handle customer queries and support', icon: '💬', href: '/admin/support', color: '#6B7280' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="" style={{ backgroundColor: theme.backgroundColor || '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: theme.headingColor || theme.textColor }}>
            Admin Dashboard
          </h1>
          <p className="text-base lg:text-lg" style={{ color: theme.textColor + '80' || '#6B7280' }}>
            Welcome back! Here&apos;s what&apos;s happening with your travel platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="rounded-xl shadow-lg p-4 lg:p-6 border transition-all hover:shadow-xl hover:scale-105"
              style={{ 
                backgroundColor: theme.surface || '#FFFFFF',
                borderColor: theme.border || '#E5E7EB'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                  style={{ backgroundColor: stat.bgColor + '20' }}
                >
                  {stat.icon}
                </div>
                <div className={`flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {stat.change}
                  <span className="ml-1">
                    {stat.trend === 'up' ? '↗️' : '↘️'}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: theme.textColor + '80' || '#6B7280' }}>
                  {stat.label}
                </p>
                <p className="text-3xl font-bold" style={{ color: theme.textColor || '#1F2937' }}>
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-6 lg:mb-8">
          <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6" style={{ color: theme.headingColor || theme.textColor }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <div 
                  className="rounded-xl shadow-md p-4 lg:p-6 border transition-all hover:shadow-lg hover:scale-105 cursor-pointer"
                  style={{ 
                    backgroundColor: theme.surface || '#FFFFFF',
                    borderColor: theme.border || '#E5E7EB'
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mr-3"
                      style={{ backgroundColor: action.color + '20' }}
                    >
                      {action.icon}
                    </div>
                    <h3 className="font-semibold text-lg" style={{ color: theme.textColor || '#1F2937' }}>
                      {action.title}
                    </h3>
                  </div>
                  <p className="text-sm" style={{ color: theme.textColor + '80' || '#6B7280' }}>
                    {action.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div 
          className="rounded-xl shadow-lg p-4 lg:p-6 border"
          style={{ 
            backgroundColor: theme.surface || '#FFFFFF',
            borderColor: theme.border || '#E5E7EB'
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 gap-4">
            <h2 className="text-xl lg:text-2xl font-bold" style={{ color: theme.headingColor || theme.textColor }}>
              Recent Bookings
            </h2>
            <Link 
              href="/admin/bookings"
              className="px-4 py-2 rounded-lg font-medium transition-colors hover:opacity-80 text-center"
              style={{ 
                backgroundColor: theme.primaryColor || '#3B82F6',
                color: theme.buttonTextColor || '#FFFFFF'
              }}
            >
              View All
            </Link>
          </div>
          
          <div className="overflow-x-auto -mx-4 lg:mx-0">
            <div className="min-w-full inline-block align-middle">
              <table className="min-w-full">
                <thead className="hidden sm:table-header-group">
                  <tr className="border-b" style={{ borderColor: theme.border || '#E5E7EB' }}>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: theme.textColor || '#1F2937' }}>
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: theme.textColor || '#1F2937' }}>
                      Destination
                    </th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: theme.textColor || '#1F2937' }}>
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: theme.textColor || '#1F2937' }}>
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: theme.textColor || '#1F2937' }}>
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: theme.textColor || '#1F2937' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr 
                      key={booking.id} 
                      className="border-b hover:bg-opacity-50 transition-colors block sm:table-row mb-4 sm:mb-0"
                      style={{ borderColor: theme.border || '#E5E7EB' }}
                    >
                      <td className="py-2 sm:py-4 px-4 block sm:table-cell">
                        <div className="sm:hidden font-semibold text-xs text-gray-500 mb-1">CUSTOMER</div>
                        <div className="font-medium" style={{ color: theme.textColor || '#1F2937' }}>
                          {booking.customer}
                        </div>
                      </td>
                      <td className="py-2 sm:py-4 px-4 block sm:table-cell">
                        <div className="sm:hidden font-semibold text-xs text-gray-500 mb-1">DESTINATION</div>
                        <div style={{ color: theme.textColor + '80' || '#6B7280' }}>
                          {booking.destination}
                        </div>
                      </td>
                      <td className="py-2 sm:py-4 px-4 block sm:table-cell">
                        <div className="sm:hidden font-semibold text-xs text-gray-500 mb-1">AMOUNT</div>
                        <div className="font-semibold" style={{ color: theme.textColor || '#1F2937' }}>
                          {booking.amount}
                        </div>
                      </td>
                      <td className="py-2 sm:py-4 px-4 block sm:table-cell">
                        <div className="sm:hidden font-semibold text-xs text-gray-500 mb-1">DATE</div>
                        <div style={{ color: theme.textColor + '80' || '#6B7280' }}>
                          {booking.date}
                        </div>
                      </td>
                      <td className="py-2 sm:py-4 px-4 block sm:table-cell">
                        <div className="sm:hidden font-semibold text-xs text-gray-500 mb-1">STATUS</div>
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-2 sm:py-4 px-4 block sm:table-cell">
                        <div className="sm:hidden font-semibold text-xs text-gray-500 mb-1">ACTIONS</div>
                        <div className="flex space-x-2">
                          <button 
                            className="text-sm font-medium hover:opacity-80 px-3 py-1 rounded"
                            style={{ color: theme.linkColor || theme.primaryColor }}
                          >
                            View
                          </button>
                          <button 
                            className="text-sm font-medium hover:opacity-80 px-3 py-1 rounded"
                            style={{ color: theme.secondaryColor || '#10B981' }}
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
