"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation"; // ✅ Extract query params
import {
    useReactTable,
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    ColumnFiltersState,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { City, Station } from "@/app/dashboard/model";
import { v4 as uuidv4 } from 'uuid';
import { Braces, ChevronDown, Plus, Pencil, Trash2, Check, Microchip, FileSpreadsheet } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

export interface DynamicDataTableProps<T> {
    data: T[];
    columns: ColumnDef<T, any>[];
    setDataAction: React.Dispatch<React.SetStateAction<T[]>>;
    addNewRow?: (newRow: T) => void;
    updateRow: (updatedRow: T) => void;
    deleteRow: (rowId: string) => void;
    tableName: string; // ✅ Pass tableName as a prop
}

export function DataTable<T extends City>({
                                              data,
                                              columns,
                                              setDataAction,
                                              addNewRow,
                                              updateRow,
                                              deleteRow,
                                              tableName
                                          }: DynamicDataTableProps<City>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [filterValue, setFilterValue] = useState("");
    const [editableRows, setEditableRows] = useState<Record<string, boolean>>({});
    const [editedRows, setEditedRows] = useState<Record<string, Partial<City>>>({});
    const searchParams = useSearchParams(); // ✅ Get URL query params
    const highlightId = searchParams.get("highlight"); // ✅ Extract station ID

    const debouncedSetFilterValue = debounce((value: string) => {
        setFilterValue(value);
    }, 300);

    const handleEditRow = (rowId: string) => {
        setEditableRows((prev) => ({ ...prev, [rowId]: true }));
        setEditedRows((prev) => ({
            ...prev,
            [rowId]: { ...data.find(row => row.id === rowId) },
        }));
    };

    const handleInputChange = (rowId: string, field: keyof City, value: string) => {
        setEditedRows((prev) => ({
            ...prev,
            [rowId]: {
                ...prev[rowId],
                [field]: value,
            },
        }));
    };

    const handleSaveRow = (rowId: string) => {
        const updatedData = editedRows[rowId];

        if (!updatedData?.name?.trim()) {
            toast.error("El nombre es obligatorio.");
            return;
        }

        updateRow({
            id: rowId,
            name: updatedData.name,
            stations: updatedData.stations || [],
        });

        setEditableRows((prev) => ({ ...prev, [rowId]: false }));
        setEditedRows((prev) => {
            const updated = { ...prev };
            delete updated[rowId];
            return updated;
        });

        toast.success("Actualizado correctamente.");
    };

    const filteredData = React.useMemo(() => {
        return data.filter((item) =>
            item.name.toLowerCase().includes(filterValue.toLowerCase())
        );
    }, [data, filterValue]);

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: { columnFilters }
    });

    return (
        <div>
            <div className="rounded-md border sm:w-[75%] xl:w-full">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                                <TableHead className="flex justify-end items-center pr-5">Actions</TableHead>
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} className={row.original.id === highlightId ? "bg-yellow-200" : ""}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {editableRows[row.original.id] && cell.column.id === "name" ? (
                                            <Input
                                                value={editedRows[row.original.id]?.name || ""}
                                                onChange={(e) => handleInputChange(row.original.id, "name", e.target.value)}
                                            />
                                        ) : (
                                            flexRender(cell.column.columnDef.cell, cell.getContext())
                                        )}
                                    </TableCell>
                                ))}
                                <TableCell className="flex space-x-2 justify-end items-end">
                                    {editableRows[row.original.id] ? (
                                        <Button variant="outline" size="sm" onClick={() => handleSaveRow(row.original.id)}>
                                            <Check className="text-green-500" />
                                        </Button>
                                    ) : (
                                        <Button variant="outline" size="sm" onClick={() => handleEditRow(row.original.id)}>
                                            <Pencil />
                                        </Button>
                                    )}
                                    <Button variant="destructive" size="sm" onClick={() => deleteRow(row.original.id)}>
                                        <Trash2 />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
