'use client';

import React, { useState, useEffect } from 'react';
import DynamicTable from '../../../../components/DynamicTable';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import {
  getAllDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
  selectDestinations,
  selectDestinationLoading,
  selectCreateLoading,
  selectUpdateLoading,
  selectDeleteLoading,
  selectDestinationError,
  clearError,
  clearCurrentDestination
} from '../../../../redux/slice/denotionSlice';
import { FaPlus, FaTimes, FaSearch, FaChevronDown, FaChevronUp, FaStar, FaImage } from 'react-icons/fa';
import { showToast } from '../../../../components/Toast';

const initialForm = {
  cityId: '',
  cityName: '',
  description: '',
  imagefile: null, // File object
  seqNo: '',
  top: false,
  type: ''
};

const DestinationTab = () => {
  const dispatch = useDispatch();
  const destinations = useSelector(selectDestinations);
  const loading = useSelector(selectDestinationLoading);
  const createLoading = useSelector(selectCreateLoading);
  const updateLoading = useSelector(selectUpdateLoading);
  const deleteLoading = useSelector(selectDeleteLoading);
  const error = useSelector(selectDestinationError);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'seqNo', direction: 'asc' });
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    dispatch(getAllDestinations());
  }, [dispatch]);

  useEffect(() => {
    if (error) showToast(error, 'error');
  }, [error]);

  const resetForm = () => {
    setFormData(initialForm);
    setEditing(null);
    dispatch(clearCurrentDestination());
  };

  const handleEdit = (destination) => {
    setEditing(destination.id);
    setFormData({
      cityId: destination.cityId,
      cityName: destination.cityName,
      description: destination.description,
      imagefile: null, // Let user upload new file
      seqNo: destination.seqNo,
      top: destination.top,
      type: destination.type
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      dispatch(deleteDestination(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      cityId: Number(formData.cityId),
      cityName: formData.cityName,
      description: formData.description,
      image: formData.imagefile, // File object for backend
      seqNo: Number(formData.seqNo),
      top: Boolean(formData.top),
      type: formData.type
    };
    if (editing) {
      dispatch(updateDestination({ id: editing, data: payload }));
    } else {
      dispatch(createDestination(payload));
    }
    setShowForm(false);
    resetForm();
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredDestinations = destinations.filter(dest => {
    return (
      dest.cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? <FaChevronUp className="inline ml-1 text-xs" /> : <FaChevronDown className="inline ml-1 text-xs" />;
  };

  return (
    <div className="space-y-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          {/* <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Destination Management</h1>
            <p className="text-gray-600 mt-1">Manage all your destinations in one place</p>
          </div> */}
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={() => { setShowForm(!showForm); resetForm(); }}
            >
              <FaPlus className="mr-2" />
              {showForm ? 'Hide Form' : 'Add Destination'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-md mb-8 p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editing ? 'Edit Destination' : 'Add New Destination'}
              </h2>
              <button 
                onClick={() => { setShowForm(false); resetForm(); }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City ID *</label>
                  <input 
                    type="number" 
                    placeholder="Enter City ID"
                    value={formData.cityId}
                    onChange={e => setFormData({ ...formData, cityId: e.target.value })} 
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City Name *</label>
                  <input 
                    type="text" 
                    placeholder="Enter City Name"
                    value={formData.cityName}
                    onChange={e => setFormData({ ...formData, cityName: e.target.value })} 
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea 
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })} 
                    required 
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image File *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setFormData({ ...formData, imagefile: e.target.files[0] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sequence Number *</label>
                  <input 
                    type="number" 
                    placeholder="Enter sequence"
                    value={formData.seqNo}
                    onChange={e => setFormData({ ...formData, seqNo: e.target.value })} 
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })} 
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                  </select>
                </div>
                
                <div className="flex items-center mt-2">
                  <input 
                    type="checkbox" 
                    id="topDestination"
                    checked={formData.top} 
                    onChange={e => setFormData({ ...formData, top: e.target.checked })} 
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="topDestination" className="ml-2 text-sm font-medium text-gray-700">
                    Top Destination
                  </label>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white px-6 py-2 rounded-lg flex items-center transition-all duration-200 shadow-md hover:shadow-lg"
                  disabled={createLoading || updateLoading}
                >
                  {editing ? 'Update Destination' : 'Create Destination'}
                </button>
                <button 
                  type="button" 
                  onClick={() => { setShowForm(false); resetForm(); }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg">
          <div className="overflow-x-auto">
            <DynamicTable
              columns={[
                {
                  key: 'id',
                  label: 'ID',
                  thClassName: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer',
                  render: (dest) => dest.id,
                  onClick: () => handleSort('id'),
                },
                {
                  key: 'cityName',
                  label: 'City',
                  thClassName: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer',
                  render: (dest) => (
                    <>
                      <span className="text-sm font-medium text-blue-700">{dest.cityName}</span>
                      <div className="text-xs text-gray-500">ID: {dest.cityId}</div>
                    </>
                  ),
                  onClick: () => handleSort('cityName'),
                },
                {
                  key: 'description',
                  label: 'Description',
                  render: (dest) => (
                    <span className="text-sm text-gray-500 max-w-xs truncate">{dest.description}</span>
                  ),
                },
                {
                  key: 'image',
                  label: 'Image',
                  render: (dest) => (
                    dest.image ? (
                      <div className="h-10 w-10 rounded bg-gray-100 border flex items-center justify-center overflow-hidden">
                        <Image
                          src={dest.image}
                          alt={dest.cityName}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded bg-gray-100 border flex items-center justify-center">
                        <FaImage className="text-gray-400" />
                      </div>
                    )
                  ),
                },
                {
                  key: 'seqNo',
                  label: 'Seq',
                  thClassName: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer',
                  render: (dest) => dest.seqNo,
                  onClick: () => handleSort('seqNo'),
                },
                {
                  key: 'top',
                  label: 'Top',
                  thClassName: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer',
                  render: (dest) => (
                    dest.top ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <FaStar className="mr-1 text-yellow-500" />
                        Top
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Standard
                      </span>
                    )
                  ),
                  onClick: () => handleSort('top'),
                },
                {
                  key: 'type',
                  label: 'Type',
                  thClassName: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer',
                  render: (dest) => <span className="text-sm text-gray-500 capitalize">{dest.type}</span>,
                  onClick: () => handleSort('type'),
                },
                {
                  key: 'actions',
                  label: 'Actions',
                  thClassName: 'px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider',
                  tdClassName: 'px-6 py-4 whitespace-nowrap text-center text-sm font-medium',
                  render: (dest) => (
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(dest)}
                        className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition-colors"
                        title="Edit"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(dest.id)}
                        disabled={deleteLoading}
                        className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      </button>
                    </div>
                  ),
                },
              ]}
              data={loading ? [] : sortedDestinations}
              emptyState={loading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <FaImage className="text-gray-400 text-4xl mb-3" />
                  <p className="text-lg">No destinations found</p>
                  <p className="mt-1">Try adding a new destination or adjusting your search</p>
                </div>
              )}
            />
          </div>
        </div>
        
        {!loading && sortedDestinations.length > 0 && (
          <div className="mt-4 text-sm text-gray-500">
            Showing <span className="font-medium">{sortedDestinations.length}</span> destinations
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationTab;