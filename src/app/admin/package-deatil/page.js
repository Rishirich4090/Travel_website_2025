"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
    getPackageDetails,
    createPackageDetail,
    selectPackageDetails,
    selectPackageDetailLoading,
    selectPackageDetailError,
    selectPackageDetailCreateLoading,
} from "../../../redux/slice/packageDetailSlice";
import DynamicTable from "../../../components/DynamicTable";
import DynamicForm from "../../../components/DynamicForm";
import { FiPlus, FiRefreshCw, FiEdit2 } from "react-icons/fi";

const formFields = [
    { name: "mediafile", label: "Media File", type: "file", required: true },
    { name: "packageId", label: "Package ID", type: "number", required: true },
    { name: "transportId", label: "Transport ID", type: "number", required: true },
    { name: "accommodationDetails", label: "Accommodation Details", type: "richtext", required: false },
    { name: "dayWiseItenaries", label: "Day Wise Itineraries (JSON)", type: "textarea", required: false, description: "Enter array of objects as JSON." },
    { name: "reportingId", label: "Reporting ID", type: "number", required: false },
    { name: "inclusionId", label: "Inclusion ID", type: "number", required: false },
    { name: "exclusionId", label: "Exclusion ID", type: "number", required: false },
    { name: "cancellationIds", label: "Cancellation IDs (comma separated)", type: "text", required: false },
    { name: "needToKnow", label: "Need To Know", type: "richtext", required: false },
    { name: "advancePreparation", label: "Advance Preparation", type: "textarea", required: false },
];

const headerTitles = {
    packageDetail: {
        addForm: "Add Package Detail",
        edit: "Edit Package Detail",
    },
};

export default function PackageDetailPage() {
    const dispatch = useDispatch();
    const packageDetails = useSelector(selectPackageDetails);
    const loading = useSelector(selectPackageDetailLoading);
    const createLoading = useSelector(selectPackageDetailCreateLoading);
    const error = useSelector(selectPackageDetailError);

    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({});
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        dispatch(getPackageDetails());
    }, [dispatch]);

    const resetForm = () => {
        setForm({});
        setEditing(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const field of formFields) {
            let value = form[field.name];
            if (field.name === "dayWiseItenaries" && typeof value === "string" && value.trim()) {
                try {
                    const parsed = JSON.parse(value);
                    if (Array.isArray(parsed)) {
                        parsed.forEach((item) => {
                            // Only send numbers (IDs)
                            if (typeof item === 'number' || (typeof item === 'string' && !isNaN(Number(item)))) {
                                data.append('dayWiseItenaries', Number(item));
                            }
                        });
                        continue; // skip default append below
                    }
                } catch {
                    // fallback: keep as string
                }
            }
            if (field.name === "cancellationIds" && typeof value === "string") {
                value = value.split(",").map((v) => v.trim()).filter(Boolean);
                value.forEach((id) => data.append('cancellationIds', id));
                continue; // skip default append below
            }
            if (value !== undefined && value !== null) {
                data.append(field.name, value);
            }
        }
        // Only create, no update endpoint yet
        dispatch(createPackageDetail(data)).then(() => {
            setShowForm(false);
            resetForm();
            dispatch(getPackageDetails());
        });
    };

    // Edit handler: prefill form and open modal
    const handleEdit = (row) => {
        const prefill = {
            ...row,
            mediafile: undefined, // file input can't be prefilled
            packageId: row.tourPackage?.packageId || row.packageId,
            accommodationDetails: row.accommodationDetails,
            transportId: row.tourTransportPlan?.id,
            reportingId: row.reportingAndDroping?.id,
            inclusionId: row.inclusion?.id,
            exclusionId: row.exclusion?.id,
            cancellationIds: row.cancellationPolicies?.map((c) => c.id).join(", ") || "",
            dayWiseItenaries: row.dayWiseItenaries ? JSON.stringify(row.dayWiseItenaries, null, 2) : "",
            needToKnow: row.needToKnow,
            advancePreparation: row.advancePreparation,
        };
        setForm(prefill);
        setEditing(true);
        setShowForm(true);
    };

    const columns = [
        { key: "id", label: "ID" },
        { key: "packageId", label: "Package ID", render: (row) => row.tourPackage?.packageId || "-" },
        { key: "packageName", label: "Package Name", render: (row) => row.tourPackage?.packageName || "-" },
        { key: "themeType", label: "Theme", render: (row) => row.tourPackage?.themeType || "-" },
        { key: "numberOfDays", label: "Days", render: (row) => row.tourPackage?.numberOfDays || "-" },
        { key: "numberOfNights", label: "Nights", render: (row) => row.tourPackage?.numberOfNights || "-" },
        { key: "image", label: "Image", render: (row) => row.tourPackage?.image ? (
            <Image
                src={row.tourPackage.image}
                alt="img"
                width={48}
                height={48}
                className="w-12 h-12 object-cover rounded"
                unoptimized
            />
        ) : "-" },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <div className="flex gap-2">
                    <button
                        className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
                        title="Edit"
                        onClick={() => handleEdit(row)}
                    >
                        <FiEdit2 className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-4 max-w-7xl mx-auto w-[77vw]">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Package Details</h1>
                <div className="flex gap-2">
                    <button
                        className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow"
                        onClick={() => dispatch(getPackageDetails())}
                        title="Refresh"
                        disabled={loading}
                    >
                        <FiRefreshCw className="w-5 h-5" />
                    </button>
                    <button
                        className="p-2 rounded-full bg-green-600 hover:bg-green-700 text-white shadow"
                        onClick={() => { setShowForm(true); setEditing(false); resetForm(); }}
                        title="Add Package Detail"
                    >
                        <FiPlus className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="mb-8">
                    <DynamicForm
                        formFields={formFields}
                        form={form}
                        setForm={setForm}
                        editing={editing}
                        headerTitles={headerTitles}
                        entity="packageDetail"
                        handleSubmit={handleSubmit}
                        setShowForm={setShowForm}
                        resetForm={resetForm}
                    />
                    {createLoading && <div className="text-center text-blue-600 mt-2">Saving...</div>}
                    {error && <div className="text-center text-red-600 mt-2">{error.message || error}</div>}
                </div>
            )}

            <DynamicTable
                columns={columns}
                data={packageDetails}
                className="min-w-full divide-y divide-gray-200"
                theadClassName="bg-gray-50"
                tbodyClassName="bg-white divide-y divide-gray-200"
                emptyState={<span>No package details found.</span>}
            />
        </div>
    );
}
