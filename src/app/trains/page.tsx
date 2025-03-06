"use client";

import React from "react";
import Header from "@/components/Header";

// Example data for trains. Replace with your actual images and descriptions.
const trains = [
    {
        name: "Giruno",
        description: "A sleek Gotthard passenger train offering fast, comfortable journeys through the Alps.",
        imageUrl: "/fleet/Giruno.jpg",
    },
    {
        name: "LD double-decker",
        description: "A spacious, two-level long-distance train designed for greater capacity and scenic views.",
        imageUrl: "/fleet/LDDoubleChecker.jpg",
    },
    {
        name: "Astoro",
        description: "An ElettroTreno Rapido known for its cross-border services and smooth acceleration.",
        imageUrl: "/fleet/Astoro.jpg",
    },
    {
        name: "ICN",
        description: "An InterCity tilting train that cuts travel time by handling curves at higher speeds.",
        imageUrl: "/fleet/ICN.webp",
    },
    {
        name: "IC2000",
        description: "A modern intercity double-decker train, built for comfort on longer journeys.",
        imageUrl: "/fleet/IC2000.jpg",
    },
    {
        name: "Flirt",
        description: "A versatile commuter train offering quick acceleration and frequent stops.",
        imageUrl: "/fleet/flirt.jpg",
    },
    {
        name: "Domino",
        description: "A regional multiple-unit train with modular carriages, ideal for short to mid-range routes.",
        imageUrl: "/fleet/domino.jpg",
    },
    {
        name: "DPZ",
        description: "A dependable suburban double-decker train, commonly used in high-traffic commuter corridors.",
        imageUrl: "/fleet/DPZ.jpg",
    },
];

export default function TrainsFleetPage() {
    return (
        <div className="bg-slate-50 min-h-screen relative">
            {/* Header */}
            <Header />

            <main className="pt-12 pb-20 relative z-10">
                <div className="mx-auto max-w-[1400px] px-4">
                    {/* Title & Subtitle */}
                    <div className="text-center space-y-3 mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Our Train Fleet</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                            Explore our modern and comfortable trains, each designed for an
                            exceptional travel experience.
                        </p>
                    </div>

                    {/* Grid of Trains */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {trains.map((train) => (
                            <div
                                key={train.name}
                                className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Wave background at top (lighter color) */}
                                <div className="absolute top-0 left-0 w-full h-12 text-slate-200 pointer-events-none z-0">
                                    <svg
                                        viewBox="0 0 1440 120"
                                        fill="none"
                                        preserveAspectRatio="none"
                                        className="w-full h-full"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M0,64L48,74.7C96,85,192,107,288,122.7C384,139,480,149,576,144C672,139,768,117,864,85.3C960,53,1056,11,1152,16C1248,21,1344,75,1392,101.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                                        />
                                    </svg>
                                </div>

                                {/* Wave background at bottom (rotated, lighter color) */}
                                <div className="absolute bottom-0 left-0 w-full h-12 text-slate-100 pointer-events-none rotate-180 z-0">
                                    <svg
                                        viewBox="0 0 1440 120"
                                        fill="none"
                                        preserveAspectRatio="none"
                                        className="w-full h-full"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M0,64L48,74.7C96,85,192,107,288,122.7C384,139,480,149,576,144C672,139,768,117,864,85.3C960,53,1056,11,1152,16C1248,21,1344,75,1392,101.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                                        />
                                    </svg>
                                </div>

                                {/* Image */}
                                <div className="relative w-full h-48 z-10">
                                    <img
                                        src={train.imageUrl}
                                        alt={train.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Text content */}
                                <div className="p-4 space-y-2 relative z-10">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {train.name}
                                    </h2>
                                    <p className="text-sm text-gray-600">{train.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
