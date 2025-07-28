'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getAllWebsiteSettings,
  createWebsiteSettings,
  updateWebsiteSettings,
  deleteWebsiteSettings,
  selectWebsiteSettings,
  selectCurrentSettings,
  selectWebsiteLoading,
  selectCreateLoading,
  selectUpdateLoading,
  selectDeleteLoading
} from '../../../../redux/slice/websiteSlice';
import { showToast } from '../../../../components/Toast';
import DynamicTable from '../../../../components/DynamicTable';
import DynamicForm from '../../../../components/DynamicForm';

// Dynamic form fields config for WebsiteTab
const websiteFormFields = [
  { name: 'companyName', label: 'Company Name', type: 'text', required: true },
  { name: 'logoUrl', label: 'Logo URL', type: 'url', required: false },
  { name: 'logosize', label: 'Logo Size', type: 'select', required: false, options: [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ] },
  { name: 'gstNumber', label: 'GST Number', type: 'text', required: false },
  { name: 'phoneNumber', label: 'Phone Number', type: 'tel', required: true },
  { name: 'emailId', label: 'Email ID', type: 'email', required: true },
  { name: 'whatsappNumber', label: 'WhatsApp Number', type: 'tel', required: false },
];

const websiteHeaderTitles = {
  edit: 'Edit Website Settings',
  addForm: 'Create Website Settings',
};

const WebsiteTab = () => {
  const dispatch = useDispatch();
  
  const websiteSettings = useSelector(selectWebsiteSettings);
  const currentSettings = useSelector(selectCurrentSettings);
  const loading = useSelector(selectWebsiteLoading);
  const createLoading = useSelector(selectCreateLoading);
  const updateLoading = useSelector(selectUpdateLoading);
  const deleteLoading = useSelector(selectDeleteLoading);

  const [showForm, setShowForm] = useState(false);
  const [editingSettings, setEditingSettings] = useState(null);
  const [formData, setFormData] = useState({
    logoUrl: '',
    logosize: 'medium',
    companyName: '',
    phoneNumber: '',
    emailId: '',
    whatsappNumber: '',
    gstNumber: '',
    officeAddress: {
      officeNo: '',
      buildingName: '',
      streetName: '',
      location: '',
      district: '',
      city: '',
      pin: ''
    },
    branchAddresses: [
      {
        officeNo: '',
        buildingName: '',
        streetName: '',
        location: '',
        district: '',
        city: '',
        pin: ''
      }
    ],
    supportContacts: [
      {
        type: 'Customer Support',
        contact: ''
      }
    ]
  });

  useEffect(() => {
    dispatch(getAllWebsiteSettings());
  }, [dispatch]);

  const resetForm = () => {
    setFormData({
      logoUrl: '',
      logosize: 'medium',
      companyName: '',
      phoneNumber: '',
      emailId: '',
      whatsappNumber: '',
      gstNumber: '',
      officeAddress: {
        officeNo: '',
        buildingName: '',
        streetName: '',
        location: '',
        district: '',
        city: '',
        pin: ''
      },
      branchAddresses: [
        {
          officeNo: '',
          buildingName: '',
          streetName: '',
          location: '',
          district: '',
          city: '',
          pin: ''
        }
      ],
      supportContacts: [
        {
          type: 'Customer Support',
          contact: ''
        }
      ]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSettings) {
        await dispatch(updateWebsiteSettings({ id: editingSettings.id, settingsData: formData })).unwrap();
        showToast('Website settings updated successfully!', 'success');
      } else {
        await dispatch(createWebsiteSettings(formData)).unwrap();
        showToast('Website settings created successfully!', 'success');
      }
      
      setShowForm(false);
      setEditingSettings(null);
      resetForm();
      dispatch(getAllWebsiteSettings());
    } catch (error) {
      showToast(`Error ${editingSettings ? 'updating' : 'creating'} website settings: ${error.message}`, 'error');
    }
  };

  const handleEdit = (settings) => {
    setEditingSettings(settings);
    setFormData({
      logoUrl: settings.logoUrl || '',
      logosize: settings.logosize || 'medium',
      companyName: settings.companyName || '',
      phoneNumber: settings.phoneNumber || '',
      emailId: settings.emailId || '',
      whatsappNumber: settings.whatsappNumber || '',
      gstNumber: settings.gstNumber || '',
      officeAddress: settings.officeAddress || {
        officeNo: '',
        buildingName: '',
        streetName: '',
        location: '',
        district: '',
        city: '',
        pin: ''
      },
      branchAddresses: settings.branchAddresses?.length > 0 ? settings.branchAddresses : [
        {
          officeNo: '',
          buildingName: '',
          streetName: '',
          location: '',
          district: '',
          city: '',
          pin: ''
        }
      ],
      supportContacts: settings.supportContacts?.length > 0 ? settings.supportContacts : [
        {
          type: 'Customer Support',
          contact: ''
        }
      ]
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete these website settings?')) {
      try {
        await dispatch(deleteWebsiteSettings(id)).unwrap();
        showToast('Website settings deleted successfully!', 'success');
        dispatch(getAllWebsiteSettings());
      } catch (error) {
        showToast(`Error deleting website settings: ${error.message}`, 'error');
      }
    }
  };

  const addBranchAddress = () => {
    setFormData({
      ...formData,
      branchAddresses: [
        ...formData.branchAddresses,
        {
          officeNo: '',
          buildingName: '',
          streetName: '',
          location: '',
          district: '',
          city: '',
          pin: ''
        }
      ]
    });
  };

  const removeBranchAddress = (index) => {
    const newBranches = formData.branchAddresses.filter((_, i) => i !== index);
    setFormData({ ...formData, branchAddresses: newBranches });
  };

  const addSupportContact = () => {
    setFormData({
      ...formData,
      supportContacts: [
        ...formData.supportContacts,
        {
          type: '',
          contact: ''
        }
      ]
    });
  };

  const removeSupportContact = (index) => {
    const newContacts = formData.supportContacts.filter((_, i) => i !== index);
    setFormData({ ...formData, supportContacts: newContacts });
  };

  const updateOfficeAddress = (field, value) => {
    setFormData({
      ...formData,
      officeAddress: {
        ...formData.officeAddress,
        [field]: value
      }
    });
  };

  const updateBranchAddress = (index, field, value) => {
    const newBranches = [...formData.branchAddresses];
    newBranches[index] = { ...newBranches[index], [field]: value };
    setFormData({ ...formData, branchAddresses: newBranches });
  };

  const updateSupportContact = (index, field, value) => {
    const newContacts = [...formData.supportContacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setFormData({ ...formData, supportContacts: newContacts });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* <div>
          <h2 className="text-2xl font-bold text-gray-900">Website Settings</h2>
          <p className="text-gray-600">Manage your company information and contact details</p>
        </div> */}
        <button
          onClick={() => {
            setShowForm(true);
            setEditingSettings(null);
            resetForm();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Settings
        </button>
      </div>

      {/* Settings Form */}
      {showForm && (
        <div className="">
          <DynamicForm
            formFields={websiteFormFields}
            form={formData}
            setForm={setFormData}
            editing={!!editingSettings}
            headerTitles={websiteHeaderTitles}
            entity={editingSettings ? 'edit' : 'addForm'}
            handleSubmit={handleSubmit}
            setShowForm={setShowForm}
            resetForm={resetForm}
          />
          {/* Office Address, Branch Addresses, Support Contacts remain below for now */}
          {/* ...existing code for address/contact groups... */}
        </div>
      )}

      {/* Settings List as Table */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <DynamicTable
            columns={[
              {
                key: 'companyName',
                label: 'Company Name',
                render: (settings) => (
                  <div>
                    <div className="font-semibold text-gray-900">{settings.companyName}</div>
                    <div className="text-xs text-gray-600">{settings.emailId}</div>
                  </div>
                ),
              },
              {
                key: 'phoneNumber',
                label: 'Phone',
                render: (settings) => <span>{settings.phoneNumber}</span>,
              },
              {
                key: 'whatsappNumber',
                label: 'WhatsApp',
                render: (settings) => <span>{settings.whatsappNumber}</span>,
              },
              {
                key: 'gstNumber',
                label: 'GST',
                render: (settings) => <span>{settings.gstNumber}</span>,
              },
              {
                key: 'actions',
                label: 'Actions',
                render: (settings) => (
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(settings)}
                      className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition-colors"
                      title="Edit"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(settings.id)}
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
                thClassName: 'px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider',
                tdClassName: 'px-6 py-4 whitespace-nowrap text-center text-sm font-medium',
              },
            ]}
            data={loading ? [] : (websiteSettings || [])}
            emptyState={loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading website settings...</span>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0h3m-3 0h5m0 0v-5a2 2 0 012-2h2a2 2 0 012 2v5" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No website settings found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating your website settings.</p>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default WebsiteTab;
