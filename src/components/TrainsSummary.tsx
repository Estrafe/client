"use client";

import React from "react";
import { Trash2, Accessibility, Leaf, PawPrint, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// This interface represents the raw ticket data coming from your API.
export interface ScheduleTicket {
    id: string; // assuming a string UUID from the backend
    train: {
        name: string;
        // Additional train-specific properties if needed.
    };
    departureTime: string;
    arrivalTime: string;
    basePrice: number; // Price provided by the backend.
}

// This is the UI type we use in the summary.
export interface TrainTicket {
    id: number;
    title: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    accessible?: boolean;
    co2Compliant?: boolean;
    seatClasses?: string[];
    animalsEnabledCoach?: boolean;
}

// Conversion function: converts a ScheduleTicket into a TrainTicket.
export function convertScheduleTicket(
    schedule: ScheduleTicket,
    computedPrice: number = 0
): TrainTicket {
    return {
        id: parseInt(schedule.id, 10) || 0, // Convert string id to number or default to 0.
        title: schedule.train.name,
        departureTime: schedule.departureTime,
        arrivalTime: schedule.arrivalTime,
        price: computedPrice || schedule.basePrice,
        accessible: false, // default value; adjust if you have this info in schedule.
        co2Compliant: true, // default value; adjust if needed.
        seatClasses: [],
        animalsEnabledCoach: false,
    };
}

interface SelectedTrainsSummaryProps {
    selectedOutbound: ScheduleTicket | null;
    selectedReturn: ScheduleTicket | null;
    onRemoveOutbound: () => void;
    onRemoveReturn: () => void;
    computedPrice?: number;
    // tripType is "one-way" by default; if "round-trip" then both cards appear.
    tripType?: "one-way" | "round-trip";
}

export default function SelectedTrainsSummary({
                                                  selectedOutbound,
                                                  selectedReturn,
                                                  onRemoveOutbound,
                                                  onRemoveReturn,
                                                  computedPrice = 0,
                                                  tripType = "one-way",
                                              }: SelectedTrainsSummaryProps) {
    // Convert raw schedule tickets to UI TrainTicket objects.
    const outboundTicket: TrainTicket | null = selectedOutbound
        ? convertScheduleTicket(selectedOutbound, computedPrice)
        : null;
    const returnTicket: TrainTicket | null =
        tripType === "round-trip" && selectedReturn
            ? convertScheduleTicket(selectedReturn, computedPrice)
            : null;

    // Compute the subtotal: if round-trip, add both prices; otherwise, use only outbound.
    const subtotal =
        outboundTicket && tripType === "round-trip" && returnTicket
            ? outboundTicket.price + returnTicket.price
            : outboundTicket
                ? outboundTicket.price
                : 0;
    const vat = subtotal * 0.21;
    const total = subtotal + vat;

    return (
        <div className="space-y-5">
            {/* Outbound Ticket Card */}
            <SelectedTrainCard
                label="Outbound"
                ticket={outboundTicket}
                accentFrom="green-400"
                accentTo="emerald-500"
                onRemove={onRemoveOutbound}
            />

            {/* Return Ticket Card (only shown for round-trip) */}
            {tripType === "round-trip" && (
                <SelectedTrainCard
                    label="Return"
                    ticket={returnTicket}
                    accentFrom="blue-400"
                    accentTo="blue-500"
                    onRemove={onRemoveReturn}
                />
            )}

            {/* Price Summary */}
            <div className="bg-white rounded-md shadow p-4">
                <h3 className="text-base font-semibold text-gray-800 text-center mb-3">
                    Price Summary
                </h3>
                {subtotal > 0 ? (
                    <div className="space-y-1 text-sm text-gray-700">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>CHF {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>VAT (21%):</span>
                            <span>CHF {vat.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-gray-900">
                            <span>Total:</span>
                            <span>CHF {total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-center">
                            <Link
                                href={{
                                    pathname: "/checkout",
                                    query:
                                        tripType === "round-trip"
                                            ? {
                                                outbound: encodeURIComponent(
                                                    JSON.stringify(outboundTicket)
                                                ),
                                                return: encodeURIComponent(
                                                    JSON.stringify(returnTicket)
                                                ),
                                            }
                                            : {
                                                outbound: encodeURIComponent(
                                                    JSON.stringify(outboundTicket)
                                                ),
                                            },
                                }}
                            >
                                <Button className="w-full mt-2" variant="outline">
                                    Continue to Checkout
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-sm text-gray-600">
                        {tripType === "round-trip"
                            ? "Select both trains to see a price breakdown."
                            : "Select a train to see the price."}
                    </p>
                )}
            </div>
        </div>
    );
}

/**
 * A sub-component for a minimal, ticket-like card.
 */
function SelectedTrainCard({
                               label,
                               ticket,
                               accentFrom,
                               accentTo,
                               onRemove,
                           }: {
    label: string;
    ticket: TrainTicket | null;
    accentFrom: string;
    accentTo: string;
    onRemove: () => void;
}) {
    return (
        <div className="relative bg-white rounded-md border border-gray-200 shadow overflow-hidden">
            {/* Left accent strip */}
            <div
                className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-${accentFrom} to-${accentTo} rounded-l-md z-20`}
            />
            {/* Light wave background */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-5">
                <svg
                    className="w-full h-full text-violet-300"
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
            <div className="relative z-10 p-4">
                {/* Label row */}
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-gray-700">
                        {label} Train
                    </h4>
                </div>
                {ticket ? (
                    <>
                        {/* Times row */}
                        <div className="flex items-center space-x-4 mb-2">
                            <div className="flex flex-col items-start">
                <span className="text-lg font-bold text-gray-900">
                  {ticket.departureTime}
                </span>
                                <span className="text-xs text-gray-500">Departure</span>
                            </div>
                            <div className="text-gray-400 text-sm -mt-4">
                                <MoveRight />
                            </div>
                            <div className="flex flex-col items-start">
                <span className="text-lg font-bold text-gray-900">
                  {ticket.arrivalTime}
                </span>
                                <span className="text-xs text-gray-500">Arrival</span>
                            </div>
                        </div>
                        {/* Title + features row */}
                        <div className="mb-2 flex flex-row gap-2">
                            <p className="text-sm font-medium text-gray-700">
                                {ticket.title}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-gray-600">
                                {ticket.accessible && (
                                    <Accessibility className="h-4 w-4 text-emerald-600" />
                                )}
                                {ticket.co2Compliant && (
                                    <Leaf className="h-4 w-4 text-green-500" />
                                )}
                                {ticket.animalsEnabledCoach && (
                                    <PawPrint className="h-4 w-4 text-yellow-900" />
                                )}
                            </div>
                        </div>
                        {/* Price + Remove button */}
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-gray-900">
                                CHF {ticket.price}
                            </p>
                            <button
                                onClick={onRemove}
                                className="inline-flex items-center text-xs text-red-600 hover:text-red-800 font-semibold"
                            >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Remove
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-sm text-gray-600 py-6">
                        No {label.toLowerCase()} train selected.
                    </p>
                )}
            </div>
        </div>
    );
}
