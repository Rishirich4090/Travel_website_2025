'use client';

import React, { useState, useEffect } from 'react';
import DynamicTable from '../../../../components/DynamicTable';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getAllLandingMedia,
  createLandingMedia,
  updateLandingMedia,
  deleteLandingMedia,
  selectLandingMedia,
  selectCurrentMedia,
  selectLandingLoading,
  selectCreateLoading,
  selectUpdateLoading,
  selectDeleteLoading
} from '../../../../redux/slice/adminLandingSlice';
import { showToast } from '../../../../components/Toast';

const LandingTab = () => {
  const dispatch = useDispatch();
  
  const landingMedia = useSelector(selectLandingMedia);
  const loading = useSelector(selectLandingLoading);
  const createLoading = useSelector(selectCreateLoading);
  const updateLoading = useSelector(selectUpdateLoading);
  const deleteLoading = useSelector(selectDeleteLoading);

  const [showForm, setShowForm] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);
  const [formData, setFormData] = useState({
    mediaType: 'image',
    title: '',
    description: '',
    displayOrder: 1,
    file1: null,
    file2: null
  });

  useEffect(() => {
    dispatch(getAllLandingMedia());
  }, [dispatch]);

  const resetForm = () => {
    setFormData({
      mediaType: 'image',
      title: '',
      description: '',
      displayOrder: 1,
      file1: null,
      file2: null
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('mediaType', formData.mediaType);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('displayOrder', formData.displayOrder.toString());
      
      if (formData.file1) {
        formDataToSend.append('file1', formData.file1);
      }
      if (formData.file2) {
        formDataToSend.append('file2', formData.file2);
      }

      if (editingMedia) {
        await dispatch(updateLandingMedia({ id: editingMedia.id, formData: formDataToSend })).unwrap();
        showToast('Landing media updated successfully!', 'success');
      } else {
        await dispatch(createLandingMedia(formDataToSend)).unwrap();
        showToast('Landing media created successfully!', 'success');
      }
      
      setShowForm(false);
      setEditingMedia(null);
      resetForm();
      dispatch(getAllLandingMedia());
    } catch (error) {
      showToast(`Error ${editingMedia ? 'updating' : 'creating'} landing media: ${error.message}`, 'error');
    }
  };

  const handleEdit = (media) => {
    setEditingMedia(media);
    setFormData({
      mediaType: media.mediaType || 'image',
      title: media.title || '',
      description: media.description || '',
      displayOrder: media.displayOrder || 1,
      file1: null,
      file2: null
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this landing media?')) {
      try {
        await dispatch(deleteLandingMedia(id)).unwrap();
        showToast('Landing media deleted successfully!', 'success');
        dispatch(getAllLandingMedia());
      } catch (error) {
        showToast(`Error deleting landing media: ${error.message}`, 'error');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* <div>
          <h2 className="text-2xl font-bold text-gray-900">Landing Page Media</h2>
          <p className="text-gray-600">Manage images and videos for your landing page</p>
        </div> */}
        <button
          onClick={() => {
            setShowForm(true);
            setEditingMedia(null);
            resetForm();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Media
        </button>
      </div>

      {/* Media Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg border p-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingMedia ? 'Edit Landing Media' : 'Add New Landing Media'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Media Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Media Type
                </label>
                <select
                  value={formData.mediaType}
                  onChange={(e) => setFormData({ ...formData, mediaType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Media File
                </label>
                <input
                  type="file"
                  onChange={(e) => setFormData({ ...formData, file1: e.target.files[0] })}
                  accept={formData.mediaType === 'video' ? 'video/*' : 'image/*'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...(!editingMedia && { required: true })}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={createLoading || updateLoading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {(createLoading || updateLoading) ? 'Saving...' : (editingMedia ? 'Update Media' : 'Add Media')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingMedia(null);
                  resetForm();
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Media List as Table */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <DynamicTable
            columns={[
              {
                key: 'title',
                label: 'Title',
                render: (media) => (
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      {media.mediaType === 'video' ? (
                        <svg className="h-8 w-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      ) : (
                        <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{media.title}</div>
                    </div>
                  </div>
                ),
              },
              {
                key: 'mediaType',
                label: 'Type',
                render: (media) => (
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
                    {media.mediaType}
                  </span>
                ),
              },
              {
                key: 'displayOrder',
                label: 'Order',
                render: (media) => (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    #{media.displayOrder}
                  </span>
                ),
              },
              {
                key: 'isActive',
                label: 'Status',
                render: (media) => (
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${media.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {media.isActive ? 'Active' : 'Inactive'}
                  </span>
                ),
              },
              {
                key: 'description',
                label: 'Description',
                render: (media) => (
                  <span className="text-sm text-gray-500 max-w-xs truncate">{media.description}</span>
                ),
              },
              {
                key: 'actions',
                label: 'Actions',
                render: (media) => (
                  <div className="flex justify-center space-x-2">
                    <button
                      title="Edit"
                      onClick={() => handleEdit(media)}
                      className="text-indigo-600 hover:text-indigo-900 transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      title={media.isActive ? 'Deactivate' : 'Activate'}
                      onClick={() => handleEdit({ ...media, isActive: !media.isActive })}
                      className={`transition-colors ${media.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                    >
                      {media.isActive ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDelete(media.id)}
                      disabled={deleteLoading}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50 transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ),
                thClassName: 'px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider',
                tdClassName: 'px-6 py-4 whitespace-nowrap text-center text-sm font-medium',
              },
            ]}
            data={loading ? [] : ([...(landingMedia || [])].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)))}
            emptyState={loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading media...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-sm font-medium text-gray-900 mb-2">No media found</h3>
                <p className="text-sm text-gray-500">Get started by adding your first landing page media.</p>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingTab;
