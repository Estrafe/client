"use client";

import React from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Define route data with station coordinates that better match the Swiss outline
interface RouteData {
    id: string;
    name: string;
    segments: string[]; // IDs for segments in the SVG (used for hover)
    stations: { name: string; cx: number; cy: number }[];
}

// Place each city so it approximately lines up with the Swiss outline's shape.
// You may tweak these (cx, cy) values further for perfect alignment.
const routesData: RouteData[] = [
    {
        id: "route-1",
        name: "Regional 101",
        segments: ["seg-zurich-bern-dup", "seg-bern-interlaken", "seg-interlaken-blenio", "seg-blenio-lugano"],
        stations: [
            { name: "Zurich", cx: 400, cy: 150 },
            { name: "Bern", cx: 200, cy: 280 },
            { name: "Interlaken", cx: 200, cy: 280 },
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
            { name: "Zurich", cx: 400, cy: 170 },
            { name: "Bern", cx: 200, cy: 280 },
            { name: "Lucerne", cx: 202, cy: 280 },
            { name: "Geneva Airport", cx: 60, cy: 320 },
        ],
    },
    {
        id: "route-4",
        name: "Eastern Express",
        segments: ["seg-zurich-winterthur", "seg-winterthur-stgallen"],
        stations: [
            { name: "Zurich", cx: 400, cy: 170 },
            { name: "Winterthur", cx: 440, cy: 150 },
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
            { name: "Zurich", cx: 400, cy: 170 },
        ],
    },
];

export default function RoutesPage() {
    // State for hovered route (by route ID)
    const [hoveredRoute, setHoveredRoute] = React.useState<string | null>(null);

    const handleSegmentHover = (routeId: string) => setHoveredRoute(routeId);
    const handleSegmentLeave = () => setHoveredRoute(null);

    return (
        <div className="bg-slate-50 min-h-screen relative">
            <Header />

            <div className="pt-10 pb-16">
                <div className="mx-auto max-w-[1400px] px-4">
                    {/* Title & Intro */}
                    <div className="text-center space-y-3 mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Routes & Services Map
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                            Explore our extensive network across the country. Hover over any route on the map for details.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Map Section (Left: 8/12 columns) */}
                        <div className="md:col-span-8">
                            {/* Fixed-size container for the map */}
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

                                {/* Switzerland outline as background */}
                                <img
                                    src="/switzerland_outline.svg"
                                    alt="Switzerland Outline"
                                    className="absolute inset-0 w-full h-full object-cover opacity-40 z-0 pointer-events-none"
                                />

                                {/* Overlay: Interactive SVG for routes & stations */}
                                <div className="relative z-20">
                                    <svg viewBox="0 0 800 600" className="w-full h-full object-cover">
                                        {/* --- Route 1: Regional 101 --- */}
                                        <line
                                            id="seg-zurich-lucerne"
                                            x1="400" y1="170"
                                            x2="320" y2="202"
                                            strokeWidth="5"
                                            stroke={hoveredRoute === "route-1" ? "#b91c1d" : "#ccc"}
                                            className="cursor-pointer"
                                            onMouseEnter={() => handleSegmentHover("route-1")}
                                            onMouseLeave={handleSegmentLeave}
                                        />
                                        <line
                                            id="seg-lucerne-bern"
                                            x1="320" y1="202"
                                            x2="200" y2="280"
                                            strokeWidth="5"
                                            stroke={hoveredRoute === "route-1" ? "#b91c1d" : "#ccc"}
                                            className="cursor-pointer"
                                            onMouseEnter={() => handleSegmentHover("route-1")}
                                            onMouseLeave={handleSegmentLeave}
                                        />
                                        <line
                                            id="seg-bern-interlaken"
                                            x1="200" y1="280"
                                            x2="350" y2="350"
                                            strokeWidth="5"
                                            stroke={hoveredRoute === "route-1" ? "#b91c1d" : "#ccc"}
                                            className="cursor-pointer"
                                            onMouseEnter={() => handleSegmentHover("route-1")}
                                            onMouseLeave={handleSegmentLeave}
                                        />
                                        <line
                                            id="seg-interlaken-blenio"
                                            x1="350" y1="350"
                                            x2="400" y2="380"
                                            strokeWidth="5"
                                            stroke={hoveredRoute === "route-1" ? "#b91c1d" : "#ccc"}
                                            className="cursor-pointer"
                                            onMouseEnter={() => handleSegmentHover("route-1")}
                                            onMouseLeave={handleSegmentLeave}
                                        />
                                        <line
                                            id="seg-blenio-lugano"
                                            x1="400" y1="380"
                                            x2="550" y2="420"
                                            strokeWidth="5"
                                            stroke={hoveredRoute === "route-1" ? "#b91c1d" : "#ccc"}
                                            className="cursor-pointer"
                                            onMouseEnter={() => handleSegmentHover("route-1")}
                                            onMouseLeave={handleSegmentLeave}
                                        />

                                        {/* --- Route 2: Express 201 --- */}
                                        <line
                                            id="seg-zurich-silenen"
                                            x1="400" y1="170"
                                            x2="450" y2="260"
                                            strokeWidth="5"
                                            stroke={hoveredRoute === "route-2" ? "#b91c1d" : "#ccc"}
                                            className="cursor-pointer"
                                            onMouseEnter={() => handleSegmentHover("route-2")}
                                            onMouseLeave={handleSegmentLeave}
                                        />
                                        <line
                                            id="seg-silenen-lugano"
                                            x1="450" y1="260"
                                            x2="550" y2="420"
                                            strokeWidth="5"
                                            stroke={hoveredRoute === "route-2" ? "#b91c1d" : "#ccc"}
                                            className="cursor-pointer"
                                            onMouseEnter={() => handleSegmentHover("route-2")}
                                            onMouseLeave={handleSegmentLeave}
                                        />

                                        {/* --- Route 3: Airport Express --- */}
                                        <line
                                            id="seg-airport-zurich"
                                            x1="400" y1="120"
                                            x2="400" y2="170"
                                            strokeWidth="5"
                                            stroke={hoveredRoute === "route-3" ? "#b91c1d" : "#ccc"}
                                            className="cursor-pointer"
                                            onMouseEnter={() => handleSegmentHover("route-3")}
                                            onMouseLeave={handleSegmentLeave}
                                        />
                                        <path
                                            id="seg-zurich-bern-dup"
                                            d="M400,170 Q300,240 200,280"
                                            strokeWidth="5"
                                            fill="none"
                                            stroke={hoveredRoute === "route-3" ? "#b91c1d" : "#ccc"}
                                            className="cursor-pointer"
                                            onMouseEnter={() => handleSegmentHover("route-3")}
                                            onMouseLeave={handleSegmentLeave}
                                        />
                                        <path
                                            id="seg-bern-geneva"
                                            d="M200,280 C130,340 80,420 40,460"
                                            strokeWidth="5"
                                            fill="none"
                                            stroke={hoveredRoute === "route-3" ? "#b91c1d" : "#ccc"}
                                            className="cursor-pointer"
                                            onMouseEnter={() => handleSegmentHover("route-3")}
                                            onMouseLeave={handleSegmentLeave}
                                        />

                                        {/* --- Route 4: Eastern Express --- */}
                                        <line
                                            id="seg-zurich-winthertur"
                                            x1="400" y1="170"
                                            x2="440" y2="150"
                                            strokeWidth="5"
                                            stroke={hoveredRoute === "route-4" ? "#b91c1d" : "#ccc"}
                                            className="cursor-pointer"
                                            onMouseEnter={() => handleSegmentHover("route-4")}
                                            onMouseLeave={handleSegmentLeave}
                                        />
                                        <line
                                            id="seg-winthertur-stgallen"
                                            x1="440" y1="150"
                                            x2="500" y2="100"
                                            strokeWidth="5"
                                            stroke={hoveredRoute === "route-4" ? "#b91c1d" : "#ccc"}
                                            className="cursor-pointer"
                                            onMouseEnter={() => handleSegmentHover("route-4")}
                                            onMouseLeave={handleSegmentLeave}
                                        />

                                        {/* --- Route 5: Alpine Connector --- */}
                                        <line
                                            id="seg-blenio-sion"
                                            x1="400" y1="380"
                                            x2="320" y2="500"
                                            strokeWidth="5"
                                            stroke={hoveredRoute === "route-5" ? "#b91c1d" : "#ccc"}
                                            className="cursor-pointer"
                                            onMouseEnter={() => handleSegmentHover("route-5")}
                                            onMouseLeave={handleSegmentLeave}
                                        />
                                        <line
                                            id="seg-como-lugano"
                                            x1="560" y1="580"
                                            x2="550" y2="420"
                                            strokeWidth="5"
                                            stroke={hoveredRoute === "route-5" ? "#b91c1d" : "#ccc"}
                                            className="cursor-pointer"
                                            onMouseEnter={() => handleSegmentHover("route-5")}
                                            onMouseLeave={handleSegmentLeave}
                                        />

                                        {/* --- Route 6: Liechtenstein Express --- */}
                                        <path
                                            id="seg-liechtenstein-silenen"
                                            d="M620,235 C600,240 540,250 450,260"
                                            strokeWidth="5"
                                            fill="none"
                                            stroke={hoveredRoute === "route-6" ? "#b91c1d" : "#ccc"}
                                            className="cursor-pointer"
                                            onMouseEnter={() => handleSegmentHover("route-6")}
                                            onMouseLeave={handleSegmentLeave}
                                        />
                                        <line
                                            id="seg-zurich-silenen"
                                            x1="400" y1="170"
                                            x2="450" y2="260"
                                            strokeWidth="5"
                                            stroke={hoveredRoute === "route-6" ? "#b91c1d" : "#ccc"}
                                            className="cursor-pointer"
                                            onMouseEnter={() => handleSegmentHover("route-6")}
                                            onMouseLeave={handleSegmentLeave}
                                        />


                                        {/* Station Nodes */}
                                        {[
                                            { name: "Zurich", cx: 400, cy: 170 },
                                            { name: "Winthertur", cx: 440, cy: 150 },
                                            { name: "Zurich Airport", cx: 400, cy: 120 },
                                            { name: "Bern", cx: 200, cy: 280 },
                                            { name: "Silenen", cx: 450, cy: 260 },
                                            { name: "Blenio", cx: 400, cy: 380 },
                                            { name: "Interlaken", cx: 350, cy: 350 },
                                            { name: "Lugano", cx: 550, cy: 420 },
                                            { name: "Geneva Airport", cx: 40, cy: 460 },
                                            { name: "St. Gallen", cx: 500, cy: 100 },
                                            { name: "Lucerne", cx: 320, cy: 202 },
                                            { name: "Como", cx: 560, cy: 580 },
                                            { name: "Sion", cx: 320, cy: 500 },
                                            { name: "Liechtenstein", cx: 620, cy: 235 },
                                        ].map((station) => (
                                            <g key={station.name}>
                                                <circle cx={station.cx} cy={station.cy} r="6" fill="#b91c1d" />
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

                        {/* Route Cards (Right: 4/12 columns) */}
                        <div className="md:col-span-4 space-y-4">
                            {routesData.map((route) => {
                                const isHovered = hoveredRoute === route.id;
                                return (
                                    <div
                                        key={route.id}
                                        className={cn(
                                            "border rounded-md p-4 shadow-sm transition cursor-pointer",
                                            isHovered
                                                ? "bg-violet-estrafe-hover/10 border-violet-estrafe/80"
                                                : "bg-white border-gray-200"
                                        )}
                                        onMouseEnter={() => handleSegmentHover(route.id)}
                                        onMouseLeave={handleSegmentLeave}
                                    >
                                        <h3
                                            className={cn(
                                                "text-sm font-bold mb-2",
                                                isHovered ? "text-violet-estrafe" : "text-gray-700"
                                            )}
                                        >
                                            {route.name}
                                        </h3>
                                        <ul className="text-xs text-gray-600 space-y-1">
                                            {route.stations.map((station) => (
                                                <li key={station.name}>• {station.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}

                            <div className="pt-6">
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
                            This map is a simplified representation. Actual routes and station names may vary. Hover over a line or a card for details.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
