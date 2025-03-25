"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DatePicker } from "@/components/DatePicker";
import { cn } from "@/lib/utils";
import {Calendar, Users, TrainFront, CircleAlert, AlertCircle} from "lucide-react";
import StationAutocomplete from "@/components/StationAutocomplete";
import { Station } from "@/app/dashboard/model";
import { useRouter } from "next/navigation";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {toast, Toaster} from "sonner";

export default function SearchTicketMenu() {
    const router = useRouter();

    // These states now hold station IDs (for departure and arrival)
    const [tripType, setTripType] = React.useState<"one-way" | "round-trip">("one-way");
    const [departureStation, setDepartureStation] = React.useState(""); // station's UUID
    const [arrivalStation, setArrivalStation] = React.useState("");     // station's UUID
    const [departureDate, setDepartureDate] = React.useState<Date | undefined>(undefined);
    const [returnDate, setReturnDate] = React.useState<Date | undefined>(undefined);
    const [passengerCount, setPassengerCount] = React.useState(1);
    const [stations, setStations] = React.useState<Station[]>([]);

    // Fetch stations on mount
    React.useEffect(() => {
        async function fetchStations() {
            try {
                const res = await fetch("http://localhost:8080/api/stations");
                if (!res.ok) {
                    throw new Error(`Failed to fetch stations: ${res.statusText}`);
                }
                const data: Station[] = await res.json();
                console.log("Fetched stations:", data);
                setStations(data);
            } catch (error) {
                console.error("Error fetching stations:", error);
            }
        }
        fetchStations();
    }, []);

    const handleSearch = () => {
        // Validate required fields
        if (
            !departureStation ||
            !arrivalStation ||
            !departureDate ||
            (tripType === "round-trip" && !returnDate)
        ) {
            toast("Incomplete Travel Details", {
                description:
                    "We can’t search for tickets until all fields are complete.",
                action: {
                    label: "Close",
                    onClick: () => console.log("Close clicked"),
                },
            });
            return;
        }

        // Build query parameters
        const query = new URLSearchParams();
        query.append("departureStationId", departureStation);
        query.append("arrivalStationId", arrivalStation);
        query.append("departureDate", departureDate.toISOString().split("T")[0]);
        if (returnDate) query.append("returnDate", returnDate.toISOString().split("T")[0]);
        query.append("passengerCount", String(passengerCount));
        query.append("tripType", tripType);

        // Navigate to /tickets with query parameters
        router.push(`/tickets?${query.toString()}`);
    };

    // Determine if the station selection error exists.
    const isSameStation = departureStation !== "" && arrivalStation !== "" && departureStation === arrivalStation;

    return (
        <div className="w-full bg-transparent py-12">
            <div className="mx-auto max-w-4xl px-4">
                {/* Trip Type */}
                <div className="flex justify-center mb-6">
                    <RadioGroup
                        value={tripType}
                        onValueChange={(value) => setTripType(value as "one-way" | "round-trip")}
                        className="flex space-x-8"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="one-way" id="one-way" className="dark:text-white dark:bg-white dark:border-gray-300" />
                            <Label htmlFor="one-way" className="cursor-pointer text-gray-800 dark:text-gray-100 font-medium text-sm">
                                One-Way
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="round-trip" id="round-trip" className="dark:text-white dark:bg-white dark:border-gray-300" />
                            <Label htmlFor="round-trip" className="cursor-pointer text-gray-800 dark:text-gray-100 font-medium text-sm">
                                Round-Trip
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Station Autocompletes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2">
                    <StationAutocomplete
                        label="Departure Station"
                        placeholder="Select departure station..."
                        value={departureStation}
                        onChange={setDepartureStation}
                        stations={stations}
                        highlightClassName={isSameStation ? "border border-red-500" : ""}
                    />
                    <StationAutocomplete
                        label="Arrival Station"
                        placeholder="Select arrival station..."
                        value={arrivalStation}
                        onChange={setArrivalStation}
                        stations={stations}
                        // Pass a red border class to the Input if there's a station error.
                        highlightClassName={isSameStation ? "border border-red-500" : ""}
                    />
                </div>
                {/* Error message if stations are the same */}
                {isSameStation && (
                    <span className="flex flex-row justify-center items-center gap-3 mb-2">
                        <CircleAlert className="h-4 w-4 text-red-500 dark:text-red-400"/>
                        <p className="text-xs text-red-500 dark:text-red-400">
                            Departure and arrival stations cannot be the same.
                        </p>
                    </span>
                )}

                {/* Dates */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col">
                        <Label className="mb-1 text-sm font-medium text-gray-700 dark:text-white flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-violet-estrafe dark:text-red-200" /> Departure Date
                        </Label>
                        <DatePicker selectedDate={departureDate} setSelectedDate={setDepartureDate} />
                    </div>
                    <div className={cn("flex flex-col", tripType === "one-way" ? "invisible" : "")}>
                        <Label className="mb-1 text-sm font-medium text-gray-700 dark:text-white flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-violet-estrafe dark:text-red-200" /> Return Date
                        </Label>
                        <DatePicker selectedDate={returnDate} setSelectedDate={setReturnDate} minDate={departureDate} />
                    </div>
                </div>

                {/* Additional Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-center">
                    {/* Passenger Count */}
                    <div className="flex items-center">
                        <Label className="mr-4 text-sm font-medium text-gray-700 dark:text-white flex items-center gap-1">
                            <Users className="h-4 w-4 text-violet-estrafe dark:text-red-200" /> Passengers
                        </Label>
                        <Button
                            variant="outline"
                            className="w-8 h-8 bg-white"
                            onClick={() => setPassengerCount(Math.max(passengerCount - 1, 1))}
                        >
                            –
                        </Button>
                        <span className="mx-3 text-sm font-medium text-gray-900">{passengerCount}</span>
                        <Button
                            variant="outline"
                            className="w-8 h-8 bg-white"
                            onClick={() => setPassengerCount(passengerCount + 1)}
                        >
                            +
                        </Button>
                    </div>
                </div>

                {/* Search Button */}
                <div className="flex justify-center">
                    <Button
                        onClick={handleSearch}
                        className="bg-violet-estrafe hover:bg-violet-estrafe-hover text-white px-8 py-3 transition-all flex items-center gap-2 w-full"
                    >
                        <TrainFront className="h-5 w-5" />
                        Search Trains
                    </Button>
                </div>
            </div>
        </div>
    );
}
