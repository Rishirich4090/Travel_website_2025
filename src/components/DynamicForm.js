import React from "react";
import RichTextField from "./RichTextField";

/**
 * DynamicForm Component
 * Reusable, dynamic form UI for admin/package, settings/tabs, etc.
 * All data/state/handlers/config are passed as props.
 */
const DynamicForm = ({
  formFields = [],
  form = {},
  setForm = () => {},
  editing = false,
  headerTitles = {},
  entity = "",
  handleSubmit = () => {},
  setShowForm = () => {},
  resetForm = () => {},
}) => (
  <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 sm:p-8">
    <div className="mb-6 border-b border-gray-200 pb-4">
      <h3 className="text-2xl font-semibold text-gray-900">
        {editing ? headerTitles[entity]?.edit : headerTitles[entity]?.addForm}
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        {editing ? "Update the existing record" : "Fill in the details to create a new record"}
      </p>
    </div>
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {formFields.map((field) => (
          <div
            key={field.name}
            className={[
              entity === "packageName" ? "sm:col-span-2" : "",
              "space-y-2",
            ].join(" ")}
          >
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </label>
            {field.type === "file" ? (
              <div className="mt-1">
                <div className="flex items-center">
                  <label className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        {field.name === "image" ? "PNG, JPG, GIF (MAX. 5MB)" : "Any file type"}
                      </p>
                    </div>
                    <input
                      type="file"
                      accept={field.name === "image" ? "image/*" : undefined}
                      onChange={e => setForm({ ...form, [field.name]: e.target.files[0] })}
                      className="hidden"
                      required={!editing && field.required}
                    />
                  </label>
                </div>
                {form[field.name]?.name && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: <span className="font-medium">{form[field.name].name}</span>
                  </p>
                )}
              </div>
            ) : field.type === "richtext" ? (
              <RichTextField
                value={form[field.name] || ""}
                onChange={val => setForm({ ...form, [field.name]: val })}
                placeholder={field.placeholder || field.label}
                className="min-h-[120px]"
              />
            ) : field.type === "textarea" ? (
              <textarea
                rows={4}
                value={form[field.name] || ""}
                onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
                required={field.required}
              />
            ) : (
              <input
                type={field.type}
                value={form[field.name] || ""}
                onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
                required={field.required}
              />
            )}
            {field.description && (
              <p className="mt-1 text-sm text-gray-500">{field.description}</p>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => {
            setShowForm(false);
            resetForm();
          }}
          className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150"
        >
          {editing ? (
            <>
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Update
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create
            </>
          )}
        </button>
      </div>
    </form>
  </div>
);

export default DynamicForm;
