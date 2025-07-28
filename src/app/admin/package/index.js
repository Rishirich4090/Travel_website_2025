

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import DynamicTable from "../../../components/DynamicTable";
import DynamicForm from "@/components/DynamicForm";
import {
  getPackages, createPackage, updatePackage, deletePackage,
  getPackageCategories, createPackageCategory, updatePackageCategory, deletePackageCategory,
  getInclusions, createInclusion, updateInclusion, deleteInclusion,
  getExclusions, createExclusion, updateExclusion, deleteExclusion
} from "../../../redux/slice/packageSlice";

const entityOptions = [
  { label: 'Package Management', value: 'package' },
  { label: 'Package Category', value: 'packageCategory' },
  { label: 'Inclusion', value: 'inclusion' },
  { label: 'Exclusion', value: 'exclusion' },
];

const entityConfig = {
  package: {
    columns: [
      { key: "id", label: "ID" },
      { key: "cityId", label: "City ID" },
      { key: "categoryId", label: "Category ID" },
      { key: "packageName", label: "Package Name" },
      { key: "numberOfDays", label: "Days" },
      { key: "numberOfNights", label: "Nights" },
      {
        key: "image",
        label: "Image",
        render: (row) =>
          row.image ? (
            <Image
              src={row.image}
              alt="package"
              width={64}
              height={40}
              className="h-10 w-16 object-cover rounded"
              style={{ objectFit: 'cover', borderRadius: '0.25rem' }}
              unoptimized={true}
            />
          ) : (
            <span className="text-gray-400">No Image</span>
          ),
      },
      {
        key: "actions",
        label: "Actions",
        render: (row, idx, { onEdit, onDelete }) => (
          <div className="flex gap-2 justify-center">
            <button
              className="text-indigo-600 hover:text-indigo-900"
              title="Edit"
              onClick={() => onEdit(row)}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              className="text-red-600 hover:text-red-900"
              title="Delete"
              onClick={() => onDelete(row.id)}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ),
        thClassName: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",
        tdClassName: "px-6 py-4 whitespace-nowrap text-center text-sm font-medium",
      },
    ],
    actions: { get: getPackages, create: createPackage, update: updatePackage, delete: deletePackage },
    formFields: [
      { name: 'cityId', label: 'City ID', type: 'number' },
      { name: 'categoryId', label: 'Category ID', type: 'number' },
      { name: 'packageName', label: 'Package Name', type: 'text' },
      { name: 'numberOfDays', label: 'Number of Days', type: 'number' },
      // { name: 'numberOfNights', label: 'Number of Nights', type: 'number' },
      { name: 'image', label: 'Image', type: 'file' },
    ],
    selector: state => state.package.packages,
    formInitial: {
      cityId: '',
      categoryId: '',
      packageName: '',
      numberOfDays: '',
      numberOfNights: '',
      image: null,
    },
  },
  packageCategory: {
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Category Name' },
      {
        key: 'actions',
        label: 'Actions',
        render: (row, idx, { onEdit, onDelete }) => (
          <div className="flex gap-2 justify-center">
            <button className="text-indigo-600 hover:text-indigo-900" title="Edit" onClick={() => onEdit(row)}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button className="text-red-600 hover:text-red-900" title="Delete" onClick={() => onDelete(row.id)}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ),
        thClassName: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",
        tdClassName: "px-6 py-4 whitespace-nowrap text-center text-sm font-medium",
      },
    ],
    actions: { get: getPackageCategories, create: createPackageCategory, update: updatePackageCategory, delete: deletePackageCategory },
    formFields: [
      { name: 'name', label: 'Category Name', type: 'text' },
    ],
    selector: state => state.package.packageCategories,
    formInitial: { name: '' },
  },
  inclusion: {
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'type', label: 'Type' },
      { key: 'category', label: 'Category' },
      { key: 'description', label: 'Description' },
      {
        key: 'actions',
        label: 'Actions',
        render: (row, idx, { onEdit, onDelete }) => (
          <div className="flex gap-2 justify-center">
            <button className="text-indigo-600 hover:text-indigo-900" title="Edit" onClick={() => onEdit(row)}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button className="text-red-600 hover:text-red-900" title="Delete" onClick={() => onDelete(row.id)}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ),
        thClassName: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",
        tdClassName: "px-6 py-4 whitespace-nowrap text-center text-sm font-medium",
      },
    ],
    actions: { get: getInclusions, create: createInclusion, update: updateInclusion, delete: deleteInclusion },
    formFields: [
  { name: 'type', label: 'Type', type: 'text' },
  { name: 'category', label: 'Category', type: 'text' },
  { name: 'description', label: 'Description', type: 'richtext', placeholder: 'Enter detailed description...' },
    ],
    selector: state => state.package.inclusions,
    formInitial: { type: '', category: '', description: '' },
  },
  exclusion: {
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'type', label: 'Type' },
      { key: 'content', label: 'Content' },
      {
        key: 'actions',
        label: 'Actions',
        render: (row, idx, { onEdit, onDelete }) => (
          <div className="flex gap-2 justify-center">
            <button className="text-indigo-600 hover:text-indigo-900" title="Edit" onClick={() => onEdit(row)}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button className="text-red-600 hover:text-red-900" title="Delete" onClick={() => onDelete(row.id)}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ),
        thClassName: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",
        tdClassName: "px-6 py-4 whitespace-nowrap text-center text-sm font-medium",
      },
    ],
    actions: { get: getExclusions, create: createExclusion, update: updateExclusion, delete: deleteExclusion },
    formFields: [
      { name: 'type', label: 'Type', type: 'text' },
      { name: 'content', label: 'Content', type: 'text' },
    ],
    selector: state => state.package.exclusions,
    formInitial: { type: '', content: '' },
  },
};


// Accept entity and setEntity as props for sidebar-driven control
const AdminPackage = ({ entity, setEntity }) => {
  const dispatch = useDispatch();
  const data = useSelector(entityConfig[entity].selector);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(entityConfig[entity].formInitial);

  useEffect(() => {
    dispatch(entityConfig[entity].actions.get());
    setShowForm(false);
    setEditing(null);
    setForm(entityConfig[entity].formInitial);
  }, [entity, dispatch]);

  const resetForm = () => {
    setForm(entityConfig[entity].formInitial);
    setEditing(null);
  };

  const handleEdit = (row) => {
    setEditing(row);
    const newForm = { ...entityConfig[entity].formInitial };
    Object.keys(newForm).forEach((key) => {
      newForm[key] = row[key] ?? '';
    });
    if (newForm.image !== undefined) newForm.image = null; // file input always null for edit
    setForm(newForm);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(entityConfig[entity].actions.delete(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload;
    if (entity === 'package') {
      payload = new FormData();
      payload.append("cityId", form.cityId);
      payload.append("categoryId", form.categoryId);
      payload.append("packageName", form.packageName);
      payload.append("numberOfDays", form.numberOfDays);
      payload.append("numberOfNights", form.numberOfNights);
      if (form.image) payload.append("image", form.image);
    } else if (entity === 'packageCategory') {
      payload = { name: form.name };
    } else if (entity === 'inclusion') {
      payload = { type: form.type, category: form.category, description: form.description };
    } else if (entity === 'exclusion') {
      payload = { type: form.type, content: form.content };
    }
    if (editing) {
      if (entity === 'package') {
        dispatch(entityConfig[entity].actions.update({ id: editing.id, data: payload })).then(() => {
          setShowForm(false);
          resetForm();
          dispatch(entityConfig[entity].actions.get());
        });
      } else {
        dispatch(entityConfig[entity].actions.update({ id: editing.id, ...payload })).then(() => {
          setShowForm(false);
          resetForm();
          dispatch(entityConfig[entity].actions.get());
        });
      }
    } else {
      dispatch(entityConfig[entity].actions.create(payload)).then(() => {
        setShowForm(false);
        resetForm();
        dispatch(entityConfig[entity].actions.get());
      });
    }
  };

  // Header titles for each entity
  const headerTitles = {
    package: {
      title: 'Package Management',
      desc: 'Manage travel packages for your portal',
      add: 'Add New Package',
      edit: 'Edit Package',
      addForm: 'Add New Package',
      empty: 'No packages found',
      emptyDesc: 'Get started by adding your first package.'
    },
    packageCategory: {
      title: 'Package Category Management',
      desc: 'Manage package categories',
      add: 'Add New Category',
      edit: 'Edit Category',
      addForm: 'Add New Category',
      empty: 'No categories found',
      emptyDesc: 'Get started by adding your first category.'
    },
    inclusion: {
      title: 'Inclusion Management',
      desc: 'Manage inclusions for packages',
      add: 'Add New Inclusion',
      edit: 'Edit Inclusion',
      addForm: 'Add New Inclusion',
      empty: 'No inclusions found',
      emptyDesc: 'Get started by adding your first inclusion.'
    },
    exclusion: {
      title: 'Exclusion Management',
      desc: 'Manage exclusions for packages',
      add: 'Add New Exclusion',
      edit: 'Edit Exclusion',
      addForm: 'Add New Exclusion',
      empty: 'No exclusions found',
      emptyDesc: 'Get started by adding your first exclusion.'
    },
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen w-[77vw]">
      <div className="max-w-7xl mx-auto">
        {/* Header only, no dropdown */}
      <div className="flex flex-col justify-between gap-6 px-4 py-5 sm:px-6 sm:flex-row sm:items-center sm:gap-8 bg-white rounded-lg shadow-sm">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {headerTitles[entity].title}
          </h2>
          <p className="flex items-center mt-1 text-sm text-gray-500">
            <span>{headerTitles[entity].desc}</span>
          </p>
        </div>

        <div className="flex flex-shrink-0 gap-3">
          <button
            onClick={() => {
              setShowForm(true);
              resetForm();
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
          >
            {headerTitles[entity].add}
            <svg className="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="">
          <DynamicForm
            formFields={entityConfig[entity].formFields}
            form={form}
            setForm={setForm}
            editing={editing}
            headerTitles={headerTitles}
            entity={entity}
            handleSubmit={handleSubmit}
            setShowForm={setShowForm}
            resetForm={resetForm}
          />
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <DynamicTable
            columns={entityConfig[entity].columns}
            data={data}
            emptyState={
              <div className="flex flex-col items-center py-8">
                <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-sm font-medium text-gray-900 mb-2">{headerTitles[entity].empty}</h3>
                <p className="text-sm text-gray-500">{headerTitles[entity].emptyDesc}</p>
              </div>
            }
            rowKey="id"
            {...{
              onEdit: handleEdit,
              onDelete: handleDelete,
            }}
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminPackage;