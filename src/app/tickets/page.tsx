"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, RailSymbol } from "lucide-react";
import Header from "@/components/Header";
import TicketCard from "@/components/TicketCard";
import FilterSidebar, { FilterState } from "@/components/FilterSidebar";
import SelectedTrainsSummary from "@/components/TrainsSummary";
import { useSearchParams, useRouter } from "next/navigation";

// New interface representing the schedule-based ticket data from the backend.
export interface ScheduleTicket {
    id: string;
    train: {
        name: string;
        // Additional train fields if needed.
    };
    departureTime: string; // ISO DateTime string
    arrivalTime: string; // ISO DateTime string
    basePrice: number; // Price provided by the backend
    // Additional fields if needed.
}

// Helper: Formats an ISO DateTime string to "HH:MM" (24-hour)
function formatTime(isoString: string): string {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };
    return date.toLocaleTimeString([], options);
}

export default function TicketsPage() {
    // Retrieve search parameters from the URL
    const searchParams = useSearchParams();
    const departureStationId = searchParams.get("departureStationId") || "";
    const arrivalStationId = searchParams.get("arrivalStationId") || "";
    const departureDate = searchParams.get("departureDate") || "";
    const returnDate = searchParams.get("returnDate") || "";
    const travelClass = searchParams.get("travelClass") || "standard";
    const passengerCount = Number(searchParams.get("passengerCount") || "1");
    // Ensure tripType is always a string, defaulting to "one-way" if null.
    const tripType = searchParams.get("tripType") || "one-way";

    // Our local state shape for tickets.
    const [tickets, setTickets] = useState<{
        outbound: ScheduleTicket[];
        return: ScheduleTicket[];
    }>({ outbound: [], return: [] });

    const [loading, setLoading] = useState(true);

    // Optional client-side filter states
    const [departureTimeRange, setDepartureTimeRange] = useState<[number, number]>([0, 24]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedSeatClasses, setSelectedSeatClasses] = useState<string[]>([]);

    // Selection states for chosen tickets
    const [selectedOutbound, setSelectedOutbound] = useState<ScheduleTicket | null>(null);
    const [selectedReturn, setSelectedReturn] = useState<ScheduleTicket | null>(null);

    const router = useRouter();

    // Fetch tickets (schedule data) from the backend
    useEffect(() => {
        async function fetchTickets() {
            try {
                // Here, we ensure tripType is a string.
                const queryParams = new URLSearchParams({
                    departureStationId,
                    arrivalStationId,
                    departureDate,
                    travelClass,
                    passengerCount: String(passengerCount),
                    tripType, // tripType is now always a string.
                    ...(returnDate && { returnDate }),
                });

                const res = await fetch(`http://localhost:8080/api/tickets?${queryParams.toString()}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch tickets: ${res.statusText}`);
                }
                const data = await res.json();
                console.log("Fetched tickets:", data);

                let outbound: ScheduleTicket[] = [];
                let returnTickets: ScheduleTicket[] = [];

                // If the backend response is an array, treat it as one-way (outbound) search.
                if (Array.isArray(data)) {
                    outbound = [...data].sort(
                        (a, b) =>
                            new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
                    );
                } else {
                    // Otherwise, assume it's an object with separate arrays for outbound and returnSchedules.
                    outbound = Array.isArray(data.outbound)
                        ? [...data.outbound].sort(
                            (a, b) =>
                                new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
                        )
                        : [];
                    returnTickets = Array.isArray(data.returnSchedules)
                        ? [...data.returnSchedules].sort(
                            (a, b) =>
                                new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
                        )
                        : [];
                }

                // If tripType is one-way, only use the outbound array.
                setTickets({
                    outbound,
                    return: tripType === "one-way" ? [] : returnTickets,
                });
            } catch (error) {
                console.error("Error fetching tickets:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTickets();
    }, [
        departureStationId,
        arrivalStationId,
        departureDate,
        returnDate,
        travelClass,
        passengerCount,
        tripType,
    ]);

    // Handlers for selecting or removing tickets
    function handleSelectOutbound(ticket: ScheduleTicket) {
        setSelectedOutbound(ticket);
    }
    function handleRemoveOutbound() {
        setSelectedOutbound(null);
    }
    function handleSelectReturn(ticket: ScheduleTicket) {
        setSelectedReturn(ticket);
    }
    function handleRemoveReturn() {
        setSelectedReturn(null);
    }

    // Prepare filter state to pass to the FilterSidebar
    const filterState: FilterState = {
        departureTimeRange,
        setDepartureTimeRange,
        priceRange,
        setPriceRange,
        selectedServices,
        setSelectedServices,
        selectedSeatClasses,
        setSelectedSeatClasses,
    };

    // Active tab state – default to "outbound"
    const [activeTab, setActiveTab] = useState<"outbound" | "return">("outbound");

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span>Loading tickets...</span>
            </div>
        );
    }

    if (!tickets || !tickets.outbound) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span>No ticket data available.</span>
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
                            <FilterSidebar {...filterState} />
                        </aside>

                        {/* Center Column (Tickets + Tabs) */}
                        <main className="md:col-span-6 space-y-4">
                            {/* Tabs + Back button */}
                            <div className="flex items-center justify-between border-b border-gray-300">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setActiveTab("outbound")}
                                        className={`py-2 px-4 text-sm font-medium ${
                                            activeTab === "outbound"
                                                ? "border-b-2 border-violet-estrafe text-violet-estrafe"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        Outbound
                                    </button>
                                    {tripType === "round-trip" && (
                                        <button
                                            onClick={() => setActiveTab("return")}
                                            className={`py-2 px-4 text-sm font-medium ${
                                                activeTab === "return"
                                                    ? "border-b-2 border-violet-estrafe text-violet-estrafe"
                                                    : "text-gray-600"
                                            }`}
                                        >
                                            Return
                                        </button>
                                    )}
                                </div>

                                <Link href="/">
                                    <Button variant="ghost" className="bg-transparent text-violet-estrafe">
                                        <ChevronLeft className="w-4 h-4 mr-1" />
                                        Go Back
                                    </Button>
                                </Link>
                            </div>

                            {/* Ticket Cards */}
                            {activeTab === "outbound" ? (
                                tickets.outbound.length > 0 ? (
                                    tickets.outbound.map((ticket) => (
                                        <TicketCard
                                            key={ticket.id}
                                            title={ticket.train.name}
                                            departureTime={formatTime(ticket.departureTime)}
                                            arrivalTime={formatTime(ticket.arrivalTime)}
                                            price={ticket.basePrice}
                                            accessible={false}
                                            co2Compliant={true}
                                            animalsEnabledCoach={false}
                                            onSelectTrain={(_className, totalPrice) => {
                                                handleSelectOutbound(ticket);
                                            }}
                                        />
                                    ))
                                ) : (
                                    <div className="flex flex-col text-center items-center justify-center mt-2">
                                        <RailSymbol className="h-20 w-auto text-gray-600" />
                                        <p className="text-lg text-gray-600">
                                            No matching outbound tickets found.
                                        </p>
                                    </div>
                                )
                            ) : (
                                tickets.return.length > 0 ? (
                                    tickets.return.map((ticket) => (
                                        <TicketCard
                                            key={ticket.id}
                                            title={ticket.train.name}
                                            departureTime={formatTime(ticket.departureTime)}
                                            arrivalTime={formatTime(ticket.arrivalTime)}
                                            price={ticket.basePrice}
                                            accessible={false}
                                            co2Compliant={true}
                                            animalsEnabledCoach={false}
                                            onSelectTrain={(_className, totalPrice) => {
                                                handleSelectReturn(ticket);
                                            }}
                                        />
                                    ))
                                ) : (
                                    <div className="flex flex-col text-center items-center justify-center mt-2">
                                        <RailSymbol className="h-20 w-auto text-gray-600" />
                                        <p className="text-lg text-gray-600">
                                            No matching return tickets found.
                                        </p>
                                    </div>
                                )
                            )}
                        </main>

                        {/* Right Column: Selected Trains & Summary */}
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
