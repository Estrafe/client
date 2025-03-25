"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import {City, Coach, Route, Seat, Station, Train} from "@/app/dashboard/model"
import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export const cityColumns: ColumnDef<City>[] = [
    {
        accessorKey: "id",
        header: "Unique ID",
        cell: ({ row }) => {
            const [copied, setCopied] = useState(false);

            const handleCopy = () => {
                navigator.clipboard.writeText(row.original.id)
                    .then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 3000); // Reset icon after 3 seconds
                    })
                    .catch((err) => console.error("Failed to copy:", err));
            };

            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm">Show UUID</Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-row items-center gap-2 text-center w-auto p-2">
                        <span className="text-sm font-medium">{row.original.id}</span>
                        <Button
                            className="text-xs relative overflow-hidden group border border-gray-300 hover:border-gray-500"
                            variant="outline"
                            size="sm"
                            onClick={handleCopy}
                        >
                            <motion.div
                                key={copied ? "check" : "copy"}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                                {copied ? (
                                    <Check className="text-green-500" />
                                ) : (
                                    <Copy className="text-gray-600 group-hover:text-gray-800" />
                                )}
                            </motion.div>
                            {/* Glow effect on success */}
                            {copied && (
                                <motion.div
                                    className="absolute inset-0 opacity-30 rounded-lg"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1.2 }}
                                    transition={{ duration: 0.3 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                />
                            )}
                        </Button>
                    </PopoverContent>
                </Popover>
            );
        },
        enableResizing: true,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        header: "Stations",
        cell: ({ row }) => {
            const city = row.original;

            if (!city.stations || !Array.isArray(city.stations) || city.stations.length === 0) {
                return <div className="text-gray-500">No stations available</div>;
            }

            const stationLinks = city.stations.map((station) => (
                <Link
                    key={station.id}
                    href={{
                        pathname: "/dashboard/stations",
                        query: { highlight: station.id }, // Pass the station ID in the query params
                    }}
                    className="text-violet-estrafe-hover hover:underline"
                >
                    {station.name || "Unnamed Station"}
                </Link>
            ));

            return <div className="whitespace-nowrap">
                {stationLinks.map((link, index) => <span key={index}>{index > 0 ? ", " : ""}{link}</span>)}
            </div>;
        },
    },
]

export const routeColumns: ColumnDef<Route>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        header: "Stations",
        cell: ({ row }) => {
            const route = row.original;
            if (!route.stationIds || route.stationIds.length === 0) {
                return <span className="text-gray-500">No stations</span>;
            }
            return (
                <div className="whitespace-nowrap">
                    {route.stationIds.map((stationId, index) => (
                        <span key={stationId}>
                            {index > 0 ? ", " : ""}
                            <Link href={`/stations/${stationId}`} className="text-blue-500 hover:underline">
                                {stationId}
                            </Link>
                        </span>
                    ))}
                </div>
            );
        },
    },
    {
        accessorKey: "originStationId.name",
        header: "Origin Station",
    },
    {
        accessorKey: "destinationStationId.name",
        header: "Destination Station",
    },
];

export const stationColumns: ColumnDef<Station>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const [copied, setCopied] = useState(false);

            const handleCopy = () => {
                navigator.clipboard.writeText(row.original.id)
                    .then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 3000); // Reset icon after 3 seconds
                    })
                    .catch((err) => console.error("Failed to copy:", err));
            };

            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm">Show UUID</Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-row items-center gap-2 text-center w-auto p-2">
                        <span className="text-sm font-medium">{row.original.id}</span>
                        <Button
                            className="text-xs relative overflow-hidden group border border-gray-300 hover:border-gray-500"
                            variant="outline"
                            size="sm"
                            onClick={handleCopy}
                        >
                            <motion.div
                                key={copied ? "check" : "copy"}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                                {copied ? (
                                    <Check className="text-green-500" />
                                ) : (
                                    <Copy className="text-gray-600 group-hover:text-gray-800" />
                                )}
                            </motion.div>
                            {/* Glow effect on success */}
                            {copied && (
                                <motion.div
                                    className="absolute inset-0 opacity-30 rounded-lg"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1.2 }}
                                    transition={{ duration: 0.3 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                />
                            )}
                        </Button>
                    </PopoverContent>
                </Popover>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <span>{row.original.name || "Unnamed Station"}</span>,
    },
    {
        accessorKey: "city.name",
        header: "City",
        cell: ({ row }) => (
            <span>
                {row.original.city && row.original.city.name
                    ? row.original.city.name
                    : "No city"}
            </span>
        ),
    },
];

export const trainColumns: ColumnDef<Train>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const [copied, setCopied] = useState(false);

            const handleCopy = () => {
                navigator.clipboard.writeText(row.original.id)
                    .then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 3000); // Reset icon after 3 seconds
                    })
                    .catch((err) => console.error("Failed to copy:", err));
            };

            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm">Show UUID</Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-row items-center gap-2 text-center w-auto p-2">
                        <span className="text-sm font-medium">{row.original.id}</span>
                        <Button
                            className="text-xs relative overflow-hidden group border border-gray-300 hover:border-gray-500"
                            variant="outline"
                            size="sm"
                            onClick={handleCopy}
                        >
                            <motion.div
                                key={copied ? "check" : "copy"}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                                {copied ? (
                                    <Check className="text-green-500" />
                                ) : (
                                    <Copy className="text-gray-600 group-hover:text-gray-800" />
                                )}
                            </motion.div>
                            {/* Glow effect on success */}
                            {copied && (
                                <motion.div
                                    className="absolute inset-0 opacity-30 rounded-lg"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1.2 }}
                                    transition={{ duration: 0.3 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                />
                            )}
                        </Button>
                    </PopoverContent>
                </Popover>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <span>{row.original.name || "No name"}</span>,
    },
    {
        accessorKey: "service.serviceName",
        header: "Service",
        cell: ({ row }) => (
            <span>{row.original.service ? row.original.service.serviceName : "No service"}</span>
        ),
    },
    {
        accessorKey: "nextStation.name",
        header: "Next Station",
        cell: ({ row }) => (
            <span>{row.original.nextStation ? row.original.nextStation.name : "No station"}</span>
        ),
    },
    {
        accessorKey: "version",
        header: "Version",
        cell: ({ row }) => <span>{row.original.version || "N/A"}</span>,
    },
];

export const coachColumns: ColumnDef<Coach>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "trainId",
        header: "Train ID",
    },
];

export const seatColumns: ColumnDef<Seat>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "seatNumber",
        header: "Seat Number",
    },
    {
        accessorKey: "classType",
        header: "Class Type",
    },
    {
        accessorKey: "booked",
        header: "Booked",
        cell: ({ row }) => (row.original.booked ? "Yes" : "No"),
    },
    {
        accessorKey: "coachId",
        header: "Coach ID",
    },
];
