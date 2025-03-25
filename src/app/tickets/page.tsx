"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, HeartCrack, RailSymbol } from "lucide-react";
import Header from "@/components/Header";
import TicketCard from "@/components/TicketCard";
import FilterSidebar from "@/components/FilterSidebar";
import SelectedTrainsSummary from "@/components/TrainsSummary";
import { useSearchParams, useRouter } from "next/navigation";

// **Updated Interface** for Train Schedules
export interface ScheduleTicket {
    id: string;
    schedule: {
        id: string;
        departureTime: string;
        arrivalTime: string;
        basePrice: number;
        route: {
            id: string;
            name: string;
            originStation: { id: string; name: string };
            destinationStation: { id: string; name: string };
        };
    };
    train: {
        id: string;
        name: string;
        accessible: boolean;
        animalsEnabled: boolean;
        co2Compliant: boolean;
        service: string;
    };
    availableSeats: number;
}

// Helper function to format time
export function formatTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

// Helper function to format dates
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        ...options,
    }).format(new Date(date));
}

export default function TicketsPage() {
    const searchParams = useSearchParams();
    const departureStationId = searchParams.get("departureStationId") || "";
    const arrivalStationId = searchParams.get("arrivalStationId") || "";
    const departureDate = searchParams.get("departureDate") || "";
    const returnDate = searchParams.get("returnDate") || "";
    const travelClass = searchParams.get("travelClass") || "standard";
    const passengerCount = Number(searchParams.get("passengerCount") || "1");
    const tripType = searchParams.get("tripType") || "one-way";

    // **🚀 Initialize Filters**
    const [departureTimeRange, setDepartureTimeRange] = useState<[number, number]>([0, 24]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedSeatClasses, setSelectedSeatClasses] = useState<string[]>([]);
    const [selectedCoachFeatures, setSelectedCoachFeatures] = useState<string[]>([]);

    // **State to store train schedules**
    const [trains, setTrains] = useState<ScheduleTicket[]>([]);
    const [loading, setLoading] = useState(true);

    // **State to track selected trains**
    const [selectedOutbound, setSelectedOutbound] = useState<{
        title: string;
        departureTime: string;
        arrivalTime: string;
        basePrice: number;
        selectedClass: "Standard" | "First Class" | "Sleeper";
    } | null>(null);

    const [selectedReturn, setSelectedReturn] = useState<{
        title: string;
        departureTime: string;
        arrivalTime: string;
        basePrice: number;
        selectedClass: "Standard" | "First Class" | "Sleeper";
    } | null>(null);

    const router = useRouter();

    if (!departureStationId || !arrivalStationId || !departureDate) {
        return (
            <>
                <Header />
                <div className="flex items-center justify-center min-h-screen px-4 -mt-20">
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl font-bold text-gray-800 flex flex-col items-center">
                            <HeartCrack className="mb-4 h-20 w-auto text-violet-estrafe" />
                            No Trains Selected
                        </h1>
                        <p className="text-gray-600">
                            Please select a train from our tickets page to continue with the checkout.
                        </p>
                        <Link href="/">
                            <Button className="bg-violet-estrafe hover:bg-violet-estrafe-hover text-white mt-5">
                                Go Search
                            </Button>
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    // **Fetch train schedules**
    useEffect(() => {
        async function fetchTrains() {
            try {
                const queryParams = new URLSearchParams({
                    originStationId: departureStationId,
                    destinationStationId: arrivalStationId,
                    departureDate,
                    travelClass,
                    passengerCount: String(passengerCount),
                    tripType,
                    ...(returnDate && { returnDate }),
                });

                const res = await fetch(`http://localhost:8080/api/tickets/schedules?${queryParams.toString()}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch train schedules: ${res.statusText}`);
                }
                const data = await res.json();
                console.log("Fetched train schedules:", data);

                setTrains(data);
            } catch (error) {
                console.error("Error fetching train schedules:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTrains();
    }, [departureStationId, arrivalStationId, departureDate, returnDate, travelClass, passengerCount, tripType]);

    // **Handle Selection of Outbound and Return Trains**
    function handleSelectOutbound(className: "Standard" | "First Class" | "Sleeper", totalPrice: number, train: ScheduleTicket) {
        setSelectedOutbound({
            title: train.train.name,
            departureTime: formatTime(train.schedule.departureTime),
            arrivalTime: formatTime(train.schedule.arrivalTime),
            basePrice: totalPrice,
            selectedClass: className,
        });
    }

    function handleSelectReturn(className: "Standard" | "First Class" | "Sleeper", totalPrice: number, train: ScheduleTicket) {
        setSelectedReturn({
            title: train.train.name,
            departureTime: formatTime(train.schedule.departureTime),
            arrivalTime: formatTime(train.schedule.arrivalTime),
            basePrice: totalPrice,
            selectedClass: className,
        });
    }

    function handleRemoveOutbound() {
        setSelectedOutbound(null);
    }

    function handleRemoveReturn() {
        setSelectedReturn(null);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span>Loading train schedules...</span>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header />
            <div className="pt-6 pb-16">
                <div className="mx-auto max-w-[1400px] px-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Sidebar (Filters) */}
                        <aside className="md:col-span-3">
                            <FilterSidebar
                                departureTimeRange={departureTimeRange}
                                setDepartureTimeRange={setDepartureTimeRange}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                selectedServices={selectedServices}
                                setSelectedServices={setSelectedServices}
                                selectedSeatClasses={selectedSeatClasses}
                                setSelectedSeatClasses={setSelectedSeatClasses}
                                selectedCoachFeatures={selectedCoachFeatures}
                                setSelectedCoachFeatures={setSelectedCoachFeatures}
                            />
                        </aside>

                        {/* Trains List */}
                        <main className="md:col-span-6 space-y-4">
                            {trains.map((train) => (
                                <TicketCard
                                    key={train.id}
                                    title={train.train.name}
                                    departureTime={formatTime(train.schedule.departureTime)}
                                    arrivalTime={formatTime(train.schedule.arrivalTime)}
                                    price={train.schedule.basePrice}
                                    accessible={train.train.accessible}
                                    co2Compliant={train.train.co2Compliant}
                                    animalsEnabledCoach={train.train.animalsEnabled}
                                    availableSeats={train.availableSeats}
                                    onSelectTrain={(className, totalPrice) => handleSelectOutbound(className, totalPrice, train)}
                                />
                            ))}
                        </main>

                        {/* Selected Trains Summary */}
                        <aside className="md:col-span-3">
                            <SelectedTrainsSummary
                                selectedOutbound={selectedOutbound}
                                selectedReturn={selectedReturn}
                                onRemoveOutbound={handleRemoveOutbound}
                                onRemoveReturn={handleRemoveReturn}
                                tripType={tripType}
                            />
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}
