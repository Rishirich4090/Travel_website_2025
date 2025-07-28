"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DynamicTable from "../../../components/DynamicTable";
import DynamicForm from "../../../components/DynamicForm";
import {
  getItineraries,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  getItineraryById,
} from "../../../redux/slice/tourTransportSlice";

const formFields = [
  { name: "remarks", label: "Remarks", type: "text", required: true },
  // Only one transport for simplicity, can be extended to multiple
  { name: "type", label: "Type", type: "text", required: true, description: 'e.g. FLIGHT' },
  { name: "name", label: "Transport Name", type: "text", required: true },
  { name: "number", label: "Transport Number", type: "text", required: true },
  { name: "departureCity", label: "Departure City", type: "text", required: true },
  { name: "departureHour", label: "Departure Hour", type: "number", required: true },
  { name: "departureMinute", label: "Departure Minute", type: "number", required: true },
  { name: "arrivalCity", label: "Arrival City", type: "text", required: true },
  { name: "arrivalHour", label: "Arrival Hour", type: "number", required: true },
  { name: "arrivalMinute", label: "Arrival Minute", type: "number", required: true },
  { name: "totalTravelTime", label: "Total Travel Time", type: "text", required: true },
];

const headerTitles = {
  itinerary: {
    addForm: "Add Itinerary",
    edit: "Edit Itinerary",
  },
};

const defaultForm = {
  remarks: "",
  type: "FLIGHT",
  name: "",
  number: "",
  departureCity: "",
  departureHour: 0,
  departureMinute: 0,
  arrivalCity: "",
  arrivalHour: 0,
  arrivalMinute: 0,
  totalTravelTime: "",
};

export default function TourTransportPage() {
  const dispatch = useDispatch();
  const { itineraries, loading } = useSelector((s) => s.tourTransport);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(getItineraries());
  }, [dispatch]);

  const handleEdit = async (id) => {
    setEditing(true);
    setEditId(id);
    const res = await dispatch(getItineraryById(id));
    const data = res.payload;
    if (data) {
      setForm({
        remarks: data.remarks,
        type: data.transports[0]?.type || "FLIGHT",
        name: data.transports[0]?.name || "",
        number: data.transports[0]?.number || "",
        departureCity: data.transports[0]?.segment?.departureCity || "",
        departureHour: data.transports[0]?.segment?.departureTime?.hour || 0,
        departureMinute: data.transports[0]?.segment?.departureTime?.minute || 0,
        arrivalCity: data.transports[0]?.segment?.arrivalCity || "",
        arrivalHour: data.transports[0]?.segment?.arrivalTime?.hour || 0,
        arrivalMinute: data.transports[0]?.segment?.arrivalTime?.minute || 0,
        totalTravelTime: data.transports[0]?.segment?.totalTravelTime || "",
      });
      setShowForm(true);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this itinerary?")) {
      dispatch(deleteItinerary(id));
    }
  };

  const resetForm = () => {
    setForm(defaultForm);
    setEditing(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      remarks: form.remarks,
      transports: [
        {
          type: form.type,
          name: form.name,
          number: form.number,
          segment: {
            departureCity: form.departureCity,
            departureTime: {
              hour: Number(form.departureHour),
              minute: Number(form.departureMinute),
              second: 0,
              nano: 0,
            },
            arrivalCity: form.arrivalCity,
            arrivalTime: {
              hour: Number(form.arrivalHour),
              minute: Number(form.arrivalMinute),
              second: 0,
              nano: 0,
            },
            totalTravelTime: form.totalTravelTime,
          },
        },
      ],
    };
    if (editing && editId) {
      await dispatch(updateItinerary({ id: editId, data: payload }));
    } else {
      await dispatch(createItinerary(payload));
    }
    setShowForm(false);
    resetForm();
    dispatch(getItineraries());
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "remarks", label: "Remarks" },
    { key: "type", label: "Type", render: (row) => row.transports[0]?.type },
    { key: "name", label: "Name", render: (row) => row.transports[0]?.name },
    { key: "number", label: "Number", render: (row) => row.transports[0]?.number },
    { key: "departureCity", label: "Departure City", render: (row) => row.transports[0]?.segment?.departureCity },
    { key: "arrivalCity", label: "Arrival City", render: (row) => row.transports[0]?.segment?.arrivalCity },
    { key: "totalTravelTime", label: "Travel Time", render: (row) => row.transports[0]?.segment?.totalTravelTime },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={() => handleEdit(row.id)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tour Transport Itineraries</h1>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => {
            setShowForm(true);
            resetForm();
          }}
        >
          Add New
        </button>
      </div>
      {showForm && (
        <DynamicForm
          formFields={formFields}
          form={form}
          setForm={setForm}
          editing={editing}
          headerTitles={headerTitles}
          entity="itinerary"
          handleSubmit={handleSubmit}
          setShowForm={setShowForm}
          resetForm={resetForm}
        />
      )}
      <div className="mt-8">
        <DynamicTable
          columns={columns}
          data={itineraries}
          emptyState={<span>No itineraries found.</span>}
        />
      </div>
    </div>
  );
}
