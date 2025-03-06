// CityTable.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import {City, Station} from "../model";

export const cityColumns: ColumnDef<City>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "stations",
        header: "Stations Count",
        cell: ({ row }) =>
            Array.isArray(row.getValue("stations"))
                ? (row.getValue("stations") as Station[]).length
                : 0,
    },
];
