'use client'

// app/dashboard/[tableName]/page.tsx
import React, { useEffect, useState } from "react";
import { DataTable } from "@/app/dashboard/[tableName]/data-table";
import { City } from "@/app/dashboard/model";
import { cityColumns } from "@/app/dashboard/[tableName]/columns";

export default function DataTablePage() {
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("http://localhost:8080/api/city", { mode: "cors" })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data: City[]) => {
                setCities(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching city data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <DataTable data={cities} columns={cityColumns} />;
}
