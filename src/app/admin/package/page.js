"use client";
import React from "react";
import AdminPackage from "./index";
import { useSearchParams } from "next/navigation";

const AdminPackagePage = () => {
	const searchParams = useSearchParams();
	const entity = searchParams.get("entity") || "package";
	return (
		<div className="flex gap-6">
			<main className="flex-1">
				<AdminPackage entity={entity} />
			</main>
		</div>
	);
};

export default AdminPackagePage;