"use client";

import React from "react";
import Header from "@/components/Header";
import SearchTicketMenu from "@/components/SearchTicketMenu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Globe,
    Shield,
    TrendingUp,
    ArrowRight,
} from "lucide-react";

export default function MainPage() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 bg-[radial-gradient(ellipse_at_top_left,_rgba(185,28,29,0.08)_0%,_transparent_60%),radial-gradient(ellipse_at_bottom_right,_rgba(216,44,44,0.05)_0%,_transparent_50%)]">
            <Header />

            {/* Search Section */}
            <section>
                <SearchTicketMenu />
            </section>

            {/* Why Book With Us Section */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
                        Why Book with Estrafe?
                    </h2>
                    <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
                        Enjoy modern, reliable, and comfortable travel with our extensive network,
                        exceptional service, and competitive fares.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm bg-white">
                            <Globe className="h-12 w-12 text-[#b91c1d] mb-3" />
                            <h3 className="text-xl font-semibold text-gray-800">Global Reach</h3>
                            <p className="text-sm text-gray-600">
                                Connect with top cities and hidden gems across Switzerland.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm bg-white">
                            <Shield className="h-12 w-12 text-[#b91c1d] mb-3" />
                            <h3 className="text-xl font-semibold text-gray-800">Safety First</h3>
                            <p className="text-sm text-gray-600">
                                Travel securely with our modern, well-maintained fleet.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm bg-white">
                            <TrendingUp className="h-12 w-12 text-[#b91c1d] mb-3" />
                            <h3 className="text-xl font-semibold text-gray-800">Great Value</h3>
                            <p className="text-sm text-gray-600">
                                Enjoy competitive prices with no hidden fees.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Routes Section */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
                        Popular Routes
                    </h2>
                    <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
                        Check out some of our most popular routes and discover the beauty of Switzerland.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Example Route Card */}
                        <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition cursor-pointer bg-white">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Zurich to Bern</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Enjoy scenic views on this classic Swiss route connecting the heart of finance with the historic capital.
                            </p>
                            <div className="flex items-center justify-end">
                                <Link href="/routes">
                                    <Button variant="ghost" className="text-[#b91c1d] flex items-center gap-1">
                                        Learn More <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        {/* Duplicate cards */}
                        <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition cursor-pointer bg-white">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Geneva to Zurich</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Travel between international hubs with comfort and style on our efficient express service.
                            </p>
                            <div className="flex items-center justify-end">
                                <Link href="/routes">
                                    <Button variant="ghost" className="text-[#b91c1d] flex items-center gap-1">
                                        Learn More <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition cursor-pointer bg-white">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Basel to Lugano</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Discover the beauty of Switzerland on this long journey from the cultural hub of Basel to the Mediterranean flair of Lugano.
                            </p>
                            <div className="flex items-center justify-end">
                                <Link href="/routes">
                                    <Button variant="ghost" className="text-[#b91c1d] flex items-center gap-1">
                                        Learn More <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Loyalty Program Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Join Our Loyalty Program
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Earn exclusive rewards every time you travel with Estrafe. Our loyalty program is designed for frequent travelers, offering special discounts, priority booking, and personalized travel offers.
                        </p>
                        <Link
                            href="/loyalty"
                            className="inline-block bg-[#b91c1d] text-white px-6 py-3 rounded-lg hover:bg-[#a1191a] transition"
                        >
                            Learn More &rarr;
                        </Link>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                        <img
                            src="/loyalty_card.svg"
                            alt="Loyalty Program Card"
                            className="w-[400px] transform rotate-6"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
