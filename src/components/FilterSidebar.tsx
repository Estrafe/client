"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {Armchair, Clock, DollarSign, TrainFront, Gem} from "lucide-react";

// Example services for filtering
const SERVICE_OPTIONS = ["Express", "Regional", "Intercity"];

// Example seat classes
const SEAT_CLASSES = ["Standard", "Premium", "First Class"];

// Example coach features
const COACH_FEATURES = ["Accessible", "Pets Allowed", "Sleeper"];

/** Type definition for the filter states & setters we expect from parent. */
export interface FilterState {
    departureTimeRange: [number, number];
    setDepartureTimeRange: React.Dispatch<React.SetStateAction<[number, number]>>;
    priceRange: [number, number];
    setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
    selectedServices: string[];
    setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>;
    selectedSeatClasses: string[];
    setSelectedSeatClasses: React.Dispatch<React.SetStateAction<string[]>>;
    selectedCoachFeatures: string[];
    setSelectedCoachFeatures: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function FilterSidebar({
                                          departureTimeRange,
                                          setDepartureTimeRange,
                                          priceRange,
                                          setPriceRange,
                                          selectedServices,
                                          setSelectedServices,
                                          selectedSeatClasses,
                                          setSelectedSeatClasses,
                                          selectedCoachFeatures,
                                          setSelectedCoachFeatures,
                                      }: FilterState) {

    function handleServiceChange(service: string, checked: boolean) {
        setSelectedServices((prev) =>
            checked ? [...prev, service] : prev.filter((s) => s !== service)
        );
    }

    function handleSeatClassChange(seatClass: string, checked: boolean) {
        setSelectedSeatClasses((prev) =>
            checked ? [...prev, seatClass] : prev.filter((s) => s !== seatClass)
        );
    }

    function handleCoachFeatureChange(feature: string, checked: boolean) {
        setSelectedCoachFeatures((prev) =>
            checked ? [...prev, feature] : prev.filter((f) => f !== feature)
        );
    }

    return (
        <div className="relative rounded-lg shadow bg-white overflow-hidden">
            {/* Subtle wave at the bottom (light gray color) */}
            <svg
                className="absolute bottom-0 left-0 w-full text-gray-100 pointer-events-none"
                viewBox="0 0 1440 320"
                fill="currentColor"
                preserveAspectRatio="none"
            >
                <path d="M0,288L80,272C160,256,320,224,480,208C640,192,800,192,960,181.3C1120,171,1280,149,1360,144L1440,128V320H0Z" />
            </svg>

            <div className="relative p-4 space-y-6 z-10">
                <h2 className="text-base font-semibold text-gray-800">Filters</h2>

                {/* Filter by Time */}
                <div className="space-y-2">
                    <label htmlFor="timeRange" className="flex gap-2 text-sm font-medium text-gray-700">
                        <Clock className="h-5 w-5" />
                        Departure Time (hrs)
                    </label>
                    <Slider
                        id="timeRange"
                        max={24}
                        step={1}
                        value={departureTimeRange}
                        onValueChange={(val) => setDepartureTimeRange([val[0], val[1]])}
                        className="mt-2"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        From {departureTimeRange[0]} to {departureTimeRange[1]} hours
                    </p>
                </div>

                {/* Filter by Price */}
                <div className="space-y-2">
                    <label htmlFor="priceRange" className="flex gap-2 text-sm font-medium text-gray-700">
                        <DollarSign className="h-5 w-5" />
                        Price Range (CHF)
                    </label>
                    <Slider
                        id="priceRange"
                        max={200}
                        step={5}
                        value={priceRange}
                        onValueChange={(val) => setPriceRange([val[0], val[1]])}
                        className="mt-2"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        CHF {priceRange[0]} – CHF {priceRange[1]}
                    </p>
                </div>

                {/* Filter by Train Service */}
                <div className="space-y-2">
                    <span className="flex gap-2 text-sm font-medium text-gray-700">
                        <TrainFront className="h-5 w-5" />
                        Train Service
                    </span>
                    <div className="grid grid-cols-2 gap-1 mt-1">
                        {SERVICE_OPTIONS.map((service) => (
                            <label key={service} className="inline-flex items-center space-x-2 text-sm text-gray-600">
                                <Checkbox
                                    checked={selectedServices.includes(service)}
                                    onCheckedChange={(checked) => handleServiceChange(service, Boolean(checked))}
                                />
                                <span>{service}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Filter by Seat Class */}
                <div className="space-y-2">
                    <span className="flex gap-2 text-sm font-medium text-gray-700">
                        <Armchair className="h-5 w-5" />
                        Seat Class
                    </span>
                    <div className="grid grid-cols-2 gap-1 mt-1">
                        {SEAT_CLASSES.map((seatClass) => (
                            <label key={seatClass} className="inline-flex items-center space-x-2 text-sm text-gray-600">
                                <Checkbox
                                    checked={selectedSeatClasses.includes(seatClass)}
                                    onCheckedChange={(checked) => handleSeatClassChange(seatClass, Boolean(checked))}
                                />
                                <span>{seatClass}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Filter by Coach Features */}
                <div className="space-y-2">
                    <span className="flex gap-2 text-sm font-medium text-gray-700">
                        <Gem className="h-5 w-5" />
                        Coach Features
                    </span>
                    <div className="grid grid-cols-2 gap-1 mt-1">
                        {COACH_FEATURES.map((feature) => (
                            <label key={feature} className="inline-flex items-center space-x-2 text-sm text-gray-600">
                                <Checkbox
                                    checked={selectedCoachFeatures.includes(feature)}
                                    onCheckedChange={(checked) => handleCoachFeatureChange(feature, Boolean(checked))}
                                />
                                <span>{feature}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
