"use client";

import React from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- Shared routes data (you might want to move this into a separate module for reuse) ---
interface RouteData {
    id: string;
    name: string;
    segments: string[];
    stations: { name: string; cx: number; cy: number }[];
}

const routesData: RouteData[] = [
    {
        id: "route-1",
        name: "Regional 101",
        segments: [
            "seg-zurich-bern-dup",
            "seg-bern-interlaken",
            "seg-interlaken-blenio",
            "seg-blenio-lugano",
        ],
        stations: [
            { name: "Zurich", cx: 400, cy: 150 },
            { name: "Bern", cx: 200, cy: 280 },
            { name: "Interlaken", cx: 350, cy: 350 },
            { name: "Blenio", cx: 400, cy: 380 },
            { name: "Lugano", cx: 550, cy: 420 },
        ],
    },
    {
        id: "route-2",
        name: "Express 201",
        segments: ["seg-zurich-silenen", "seg-silenen-lugano"],
        stations: [
            { name: "Zurich", cx: 400, cy: 150 },
            { name: "Silenen", cx: 450, cy: 260 },
            { name: "Lugano", cx: 550, cy: 420 },
        ],
    },
    {
        id: "route-3",
        name: "Airport Express",
        segments: ["seg-airport-zurich", "seg-zurich-bern-dup", "seg-bern-geneva"],
        stations: [
            { name: "Zurich Airport", cx: 400, cy: 120 },
            { name: "Zurich", cx: 400, cy: 150 },
            { name: "Bern", cx: 200, cy: 280 },
            { name: "Lucerne", cx: 202, cy: 280 },
            { name: "Geneva Airport", cx: 60, cy: 320 },
        ],
    },
    {
        id: "route-4",
        name: "Eastern Express",
        segments: ["seg-zurich-stgallen", "seg-stgallen-lugano"],
        stations: [
            { name: "Zurich", cx: 400, cy: 150 },
            { name: "St. Gallen", cx: 500, cy: 100 },
        ],
    },
    {
        id: "route-5",
        name: "Alpine Connector",
        segments: ["seg-blenio-sion", "seg-como-lugano"],
        stations: [
            { name: "Blenio", cx: 400, cy: 380 },
            { name: "Sion", cx: 320, cy: 500 },
            { name: "Como", cx: 560, cy: 580 },
            { name: "Lugano", cx: 550, cy: 420 },
        ],
    },
    {
        id: "route-6",
        name: "Liechtenstein Express",
        segments: ["seg-liechtenstein-silenen"],
        stations: [
            { name: "Liechtenstein", cx: 620, cy: 235 },
            { name: "Silenen", cx: 450, cy: 260 },
        ],
    },
];

// --- Build a unique list of stations from all routes ---
interface Station {
    name: string;
    cx: number;
    cy: number;
    info?: string;
}

// Custom descriptions for specific stations
const stationDescriptions: { [key: string]: string } = {
    Zurich: "The largest city in Switzerland, a global financial hub.",
    "Zurich Airport": "The main international gateway in the Zurich region.",
    Bern: "The capital, known for its medieval charm.",
    Interlaken: "A scenic town nestled between two lakes in the Alps.",
    Blenio: "A region offering stunning Alpine views.",
    Lugano: "A Mediterranean-style city in southern Switzerland.",
    "Geneva Airport": "A major hub serving the French-speaking region.",
    "St. Gallen": "Renowned for its cultural heritage and textiles.",
    Lucerne: "A picturesque city by Lake Lucerne with alpine views.",
    Como: "Famous for its lake and proximity to Italy.",
    Sion: "The capital of Valais, known for its vineyards.",
    Liechtenstein: "A small principality with breathtaking alpine landscapes.",
};

const getUniqueStations = (routes: RouteData[]): Station[] => {
    const stationMap = new Map<string, Station>();
    routes.forEach((route) => {
        route.stations.forEach((station) => {
            if (!stationMap.has(station.name)) {
                stationMap.set(station.name, {
                    ...station,
                    info: stationDescriptions[station.name] || "Information not available.",
                });
            }
        });
    });
    return Array.from(stationMap.values());
};

const stations = getUniqueStations(routesData);

// --- StationsPage Component ---
export default function StationsPage() {
    const [hoveredStation, setHoveredStation] = React.useState<string | null>(null);

    return (
        <div className="bg-slate-50 min-h-screen relative">
            <Header />

            <div className="pt-10 pb-16">
                <div className="mx-auto max-w-[1400px] px-4">
                    {/* Title & Intro */}
                    <div className="text-center space-y-3 mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Our Stations</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                            Discover the major stations in our network. Hover over a station on the map or its card for details.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Map Section (Left: 8/12 columns) */}
                        <div className="md:col-span-8">
                            {/* Fixed-size container for the map (matches routes map dimensions: 800x600) */}
                            <div className="relative w-[800px] h-[600px] mx-auto rounded-lg shadow overflow-hidden bg-white">
                                {/* Subtle wave background overlay */}
                                <div className="absolute inset-0 pointer-events-none opacity-10 z-10">
                                    <svg
                                        className="w-full h-full text-violet-estrafe-hover"
                                        viewBox="0 0 1440 320"
                                        fill="none"
                                        preserveAspectRatio="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M0,64L80,101.3C160,139,320,213,480,250.7C640,288,800,288,960,277.3C1120,267,1280,245,1360,234.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                                        />
                                    </svg>
                                </div>

                                {/* Swiss outline background */}
                                <img
                                    src="/switzerland_outline.svg"
                                    alt="Switzerland Outline"
                                    className="absolute inset-0 w-full h-full object-cover opacity-40 z-0 pointer-events-none"
                                />

                                {/* Overlay: Stations */}
                                <div className="relative z-20">
                                    <svg viewBox="0 0 800 600" className="w-full h-full object-cover">
                                        {stations.map((station) => (
                                            <g
                                                key={station.name}
                                                onMouseEnter={() => setHoveredStation(station.name)}
                                                onMouseLeave={() => setHoveredStation(null)}
                                            >
                                                <circle
                                                    cx={station.cx}
                                                    cy={station.cy}
                                                    r="6"
                                                    fill={hoveredStation === station.name ? "#000000" : "#890070"}
                                                    className={hoveredStation === station.name ? "animate-pulse" : ""}
                                                />
                                                <text
                                                    x={station.cx}
                                                    y={station.cy - 10}
                                                    textAnchor="middle"
                                                    fontSize="12"
                                                    fill="#333"
                                                >
                                                    {station.name}
                                                </text>
                                            </g>
                                        ))}
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Station Cards (Right: 4/12 columns) arranged in two columns */}
                        <div className="md:col-span-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {stations.map((station) => {
                                    const isHovered = hoveredStation === station.name;
                                    return (
                                        <div
                                            key={station.name}
                                            className={cn(
                                                "border rounded-md p-4 shadow-sm transition cursor-pointer",
                                                isHovered ? "bg-violet-50 border-violet-300" : "bg-white border-gray-200"
                                            )}
                                            onMouseEnter={() => setHoveredStation(station.name)}
                                            onMouseLeave={() => setHoveredStation(null)}
                                        >
                                            <h3 className="text-sm font-bold mb-1">{station.name}</h3>
                                            <p className="text-xs text-gray-600">{station.info}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="pt-6 text-center">
                                <Link href="/">
                                    <Button className="w-full bg-violet-estrafe hover:bg-violet-estrafe-hover text-white">
                                        Book Tickets
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-8 text-sm text-gray-600">
                        <p>
                            This map is a simplified representation. Actual routes and station names may vary.
                            Hover over a station or its card for details.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
