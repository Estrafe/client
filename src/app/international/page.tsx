"use client";

import React from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
const InternationalMap = dynamic(() => import("@/components/InternationalMap"), {
    ssr: false,
});
// Statistics data remains unchanged
const statsData = [
    {
        country: "Germany",
        description: "Robust network connecting Swiss and German cities.",
        statistic: "1,200+ daily riders",
    },
    {
        country: "France",
        description: "High-speed links to Paris and Lyon.",
        statistic: "900+ daily commuters",
    },
    {
        country: "Austria",
        description: "Efficient routes linking Swiss and Austrian hubs.",
        statistic: "900+ daily cross-border riders",
    },
    {
        country: "Italy",
        description: "Seamless connections to Milan and Rome.",
        statistic: "800+ daily travelers",
    },
    {
        country: "Spain",
        description: "Expanding service to major Spanish cities.",
        statistic: "700+ daily passengers",
    },
    {
        country: "Netherlands",
        description: "Strong presence with fast links to Amsterdam.",
        statistic: "500+ daily connections",
    },
];

export default function InternationalPresencePage() {
    // (Optionally, if you still want to display station cards below the map, use your existing code)

    return (
        <div className="bg-slate-50 min-h-screen relative">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-gray-200">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="/international.png" // Replace with your own Europe map hero image
                        alt="Map of Europe"
                        className="w-full h-full object-cover opacity-20 blur-sm"
                    />
                </div>
                <div className="relative z-10 py-20 text-center">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">
                        Our International Presence
                    </h1>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                        Connecting Switzerland with Europe&#39;s major cities through our reliable and innovative rail network.
                    </p>
                    <div className="mt-8">
                        <Link href="/routes">
                            <Button className="bg-violet-estrafe hover:bg-violet-estrafe-hover text-white px-6 py-3">
                                Explore Routes
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                        Key Markets in Europe
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {statsData.map((stat) => (
                            <div
                                key={stat.country}
                                className={cn(
                                    "border rounded-lg p-6 bg-white shadow hover:shadow-lg transition",
                                    "flex flex-col items-center text-center"
                                )}
                            >
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{stat.country}</h3>
                                <p className="text-sm text-gray-600 mb-4">{stat.description}</p>
                                <span className="text-xl font-semibold text-violet-estrafe">{stat.statistic}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map & Connection Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Map Section (Left: 8/12 columns) */}
                <div className="md:col-span-8">
                    <div className="relative w-[800px] h-[600px] mx-auto rounded-lg shadow overflow-hidden bg-white">
                        {/* Render interactive OSM map via React Leaflet */}
                        <InternationalMap />
                    </div>
                </div>

                {/* (Optional) Connection Cards Section on the Right */}
                {/* You can include station cards or additional info here if needed */}
            </div>

            {/* Call to Action Section */}
            <section className="py-12 bg-gradient-to-br from-violet-50 via-white to-slate-50">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Travel?</h2>
                    <p className="text-gray-600 mb-8">
                        Discover more routes and book your next journey with us today.
                    </p>
                    <Link href="/tickets">
                        <Button className="bg-violet-estrafe hover:bg-violet-estrafe-hoverº text-white px-8 py-3">
                            Book Your Ticket
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
