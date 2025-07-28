'use client';

import React, { useState, useEffect } from 'react';
import DynamicTable from '../../../../components/DynamicTable';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getAllThemes, 
  createTheme, 
  updateTheme, 
  deleteTheme,
  selectThemes,
  selectCurrentTheme,
  selectActiveTheme,
  selectThemeLoading,
  selectCreateLoading,
  selectUpdateLoading,
  selectDeleteLoading,
  activateColorTheme
} from '../../../../redux/slice/adminColorSlice';
import { getPublicColorTheme, applyPublicTheme } from '../../../../redux/slice/publicApiSlice';
import { showToast } from '../../../../components/Toast';

const ThemeTab = () => {
  const dispatch = useDispatch();
  
  const themes = useSelector(selectThemes);
  const activeTheme = useSelector(selectActiveTheme);
  const loading = useSelector(selectThemeLoading);
  const createLoading = useSelector(selectCreateLoading);
  const updateLoading = useSelector(selectUpdateLoading);
  const deleteLoading = useSelector(selectDeleteLoading);

  const [showForm, setShowForm] = useState(false);
  const [editingTheme, setEditingTheme] = useState(null);
  const [formData, setFormData] = useState({
    themeName: '',
    primaryColor: '#007bff',
    secondaryColor: '#6c757d',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    headingColor: '#212529',
    linkColor: '#007bff',
    buttonBgColor: '#007bff',
    buttonTextColor: '#ffffff',
    navbarBgColor: '#f8f9fa',
    navbarTextColor: '#000000',
    footerBgColor: '#343a40',
    footerTextColor: '#ffffff'
  });

  useEffect(() => {
    dispatch(getAllThemes());
  }, [dispatch]);

  const resetForm = () => {
    setFormData({
      themeName: '',
      primaryColor: '#007bff',
      secondaryColor: '#6c757d',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      headingColor: '#212529',
      linkColor: '#007bff',
      buttonBgColor: '#007bff',
      buttonTextColor: '#ffffff',
      navbarBgColor: '#f8f9fa',
      navbarTextColor: '#000000',
      footerBgColor: '#343a40',
      footerTextColor: '#ffffff'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTheme) {
        await dispatch(updateTheme({ id: editingTheme.id, themeData: formData })).unwrap();
        showToast('Theme updated successfully!', 'success');
      } else {
        await dispatch(createTheme(formData)).unwrap();
        showToast('Theme created successfully!', 'success');
      }
      setShowForm(false);
      setEditingTheme(null);
      resetForm();
      dispatch(getAllThemes());
    } catch (error) {
      showToast(`Error ${editingTheme ? 'updating' : 'creating'} theme: ${error.message}`, 'error');
    }
  };

  const handleEdit = (theme) => {
    setEditingTheme(theme);
    setFormData({
      themeName: theme.themeName || '',
      primaryColor: theme.primaryColor || '#007bff',
      secondaryColor: theme.secondaryColor || '#6c757d',
      backgroundColor: theme.backgroundColor || '#ffffff',
      textColor: theme.textColor || '#000000',
      headingColor: theme.headingColor || '#212529',
      linkColor: theme.linkColor || '#007bff',
      buttonBgColor: theme.buttonBgColor || '#007bff',
      buttonTextColor: theme.buttonTextColor || '#ffffff',
      navbarBgColor: theme.navbarBgColor || '#f8f9fa',
      navbarTextColor: theme.navbarTextColor || '#000000',
      footerBgColor: theme.footerBgColor || '#343a40',
      footerTextColor: theme.footerTextColor || '#ffffff'
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this theme?')) {
      try {
        await dispatch(deleteTheme(id)).unwrap();
        showToast('Theme deleted successfully!', 'success');
        dispatch(getAllThemes());
      } catch (error) {
        showToast(`Error deleting theme: ${error.message}`, 'error');
      }
    }
  };

  const handleApplyTheme = async (theme) => {
    try {
      // Activate theme via API
      await dispatch(activateColorTheme(theme.id)).unwrap();
      showToast(`Theme "${theme.themeName}" set as active!`, 'success');
      // Optionally refresh themes list
      dispatch(getAllThemes());
    } catch (error) {
      showToast(`Error activating theme: ${error.message}`, 'error');
    }
  };

  const colorFields = [
    { key: 'primaryColor', label: 'Primary Color' },
    { key: 'secondaryColor', label: 'Secondary Color' },
    { key: 'backgroundColor', label: 'Background Color' },
    { key: 'textColor', label: 'Text Color' },
    { key: 'headingColor', label: 'Heading Color' },
    { key: 'linkColor', label: 'Link Color' },
    { key: 'buttonBgColor', label: 'Button Background' },
    { key: 'buttonTextColor', label: 'Button Text' },
    { key: 'navbarBgColor', label: 'Navbar Background' },
    { key: 'navbarTextColor', label: 'Navbar Text' },
    { key: 'footerBgColor', label: 'Footer Background' },
    { key: 'footerTextColor', label: 'Footer Text' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* <div>
          <h2 className="text-2xl font-bold text-gray-900">Theme Management</h2>
          <p className="text-gray-600">Create and manage color themes for your application</p>
        </div> */}
        <button
          onClick={() => {
            setShowForm(true);
            setEditingTheme(null);
            resetForm();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Theme
        </button>
      </div>

      {/* Theme Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg border p-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingTheme ? 'Edit Theme' : 'Create New Theme'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Theme Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme Name
              </label>
              <input
                type="text"
                value={formData.themeName}
                onChange={(e) => setFormData({ ...formData, themeName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter theme name"
              />
            </div>

            {/* Color Fields */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {colorFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={formData[field.key]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData[field.key]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={createLoading || updateLoading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {(createLoading || updateLoading) ? 'Saving...' : (editingTheme ? 'Update Theme' : 'Create Theme')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingTheme(null);
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

      {/* Themes List as Table */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <DynamicTable
            columns={[
              {
                key: 'themeName',
                label: 'Theme Name',
                render: (theme) => (
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <svg className="h-8 w-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{theme.themeName}</div>
                    </div>
                  </div>
                ),
              },
              {
                key: 'colorPreview',
                label: 'Color Preview',
                render: (theme) => (
                  <div className="flex space-x-1">
                    <div className="h-6 w-6 rounded border shadow-sm" style={{ backgroundColor: theme.primaryColor }} title="Primary Color"></div>
                    <div className="h-6 w-6 rounded border shadow-sm" style={{ backgroundColor: theme.secondaryColor }} title="Secondary Color"></div>
                    <div className="h-6 w-6 rounded border shadow-sm" style={{ backgroundColor: theme.backgroundColor }} title="Background Color"></div>
                    <div className="h-6 w-6 rounded border shadow-sm" style={{ backgroundColor: theme.textColor }} title="Text Color"></div>
                  </div>
                ),
              },
              {
                key: 'primaryColor',
                label: 'Primary Color',
                render: (theme) => (
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full mr-2 border" style={{ backgroundColor: theme.primaryColor }}></div>
                    <span className="text-xs font-mono">{theme.primaryColor}</span>
                  </div>
                ),
              },
              {
                key: 'isActive',
                label: 'Status',
                render: (theme) => (
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${theme.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {theme.isActive ? 'Active' : 'Inactive'}
                  </span>
                ),
              },
              {
                key: 'actions',
                label: 'Actions',
                render: (theme) => (
                  <div className="flex justify-center space-x-2">
                    <button
                      title="Apply Theme"
                      onClick={() => handleApplyTheme(theme)}
                      className="text-green-600 hover:text-green-900 transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <button
                      title="Edit"
                      onClick={() => handleEdit(theme)}
                      className="text-indigo-600 hover:text-indigo-900 transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDelete(theme.id)}
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
            data={loading ? [] : (themes?.filter(theme => theme && theme.themeName) || [])}
            emptyState={loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading themes...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
                <h3 className="text-sm font-medium text-gray-900 mb-2">No themes found</h3>
                <p className="text-sm text-gray-500">Get started by creating your first theme.</p>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeTab;
