"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoveRight, Trash2 } from "lucide-react";

interface SelectedTrainProps {
    selectedOutbound: {
        title: string;
        departureTime: string;
        arrivalTime: string;
        basePrice: number;
        selectedClass: "Standard" | "First Class" | "Sleeper";
    } | null;
    selectedReturn?: {
        title: string;
        departureTime: string;
        arrivalTime: string;
        basePrice: number;
        selectedClass: "Standard" | "First Class" | "Sleeper";
    } | null;
    onRemoveOutbound: () => void;
    onRemoveReturn: () => void;
    tripType: "one-way" | "round-trip";
}

/** Surcharge logic per class */
function getClassPrice(basePrice: number, className: "Standard" | "First Class" | "Sleeper") {
    switch (className) {
        case "Standard":
            return basePrice;
        case "First Class":
            return basePrice + 20; // +20 CHF
        case "Sleeper":
            return basePrice + 35; // +35 CHF
        default:
            return basePrice;
    }
}

export default function SelectedTrainsSummary({
                                                  selectedOutbound,
                                                  selectedReturn,
                                                  onRemoveOutbound,
                                                  onRemoveReturn,
                                                  tripType,
                                              }: SelectedTrainProps) {
    const router = useRouter();

    // Calculate final prices
    const outboundTotal = selectedOutbound
        ? getClassPrice(selectedOutbound.basePrice, selectedOutbound.selectedClass)
        : 0;

    const returnTotal = selectedReturn
        ? getClassPrice(selectedReturn.basePrice, selectedReturn.selectedClass)
        : 0;

    const grandTotal = outboundTotal + returnTotal;

    // **Proceed to Checkout Handler**
    function handleProceedToCheckout() {
        const queryParams = new URLSearchParams();

        // Encode Outbound Train Data
        if (selectedOutbound) {
            queryParams.set(
                "outbound",
                encodeURIComponent(
                    JSON.stringify({
                        title: selectedOutbound.title,
                        departureTime: selectedOutbound.departureTime,
                        arrivalTime: selectedOutbound.arrivalTime,
                        price: outboundTotal,
                        seatClass: selectedOutbound.selectedClass,
                    })
                )
            );
        }

        // Encode Return Train Data (if applicable)
        if (tripType === "round-trip" && selectedReturn) {
            queryParams.set(
                "return",
                encodeURIComponent(
                    JSON.stringify({
                        title: selectedReturn.title,
                        departureTime: selectedReturn.departureTime,
                        arrivalTime: selectedReturn.arrivalTime,
                        price: returnTotal,
                        seatClass: selectedReturn.selectedClass,
                    })
                )
            );
        }

        // Redirect to `/checkout` with selected trains' details
        router.push(`/checkout?${queryParams.toString()}`);
    }

    return (
        <Card className="border border-gray-200 shadow-md bg-white">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">
                    Selected Trains
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Outbound Train */}
                {selectedOutbound ? (
                    <div className="bg-gray-50 p-3 rounded-md border">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-semibold">{selectedOutbound.title}</h3>
                                <p className="text-xs text-gray-500">
                                    {selectedOutbound.departureTime} → {selectedOutbound.arrivalTime}
                                </p>
                                <p className="text-xs text-gray-600">{selectedOutbound.selectedClass}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-bold">CHF {outboundTotal}</span>
                                <Button variant="ghost" onClick={onRemoveOutbound} className="text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No outbound train selected.</p>
                )}

                {/* Return Train (if round-trip) */}
                {tripType === "round-trip" && selectedReturn ? (
                    <div className="bg-gray-50 p-3 rounded-md border">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-semibold">{selectedReturn.title}</h3>
                                <p className="text-xs text-gray-500">
                                    {selectedReturn.departureTime} → {selectedReturn.arrivalTime}
                                </p>
                                <p className="text-xs text-gray-600">{selectedReturn.selectedClass}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-bold">CHF {returnTotal}</span>
                                <Button variant="ghost" onClick={onRemoveReturn} className="text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : tripType === "round-trip" ? (
                    <p className="text-sm text-gray-500">No return train selected.</p>
                ) : null}

                {/* Grand Total */}
                <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold text-violet-estrafe">CHF {grandTotal}</span>
                </div>

                {/* Proceed to Checkout Button */}
                <Button
                    className="w-full bg-violet-estrafe hover:bg-violet-estrafe-hover"
                    onClick={handleProceedToCheckout}
                    disabled={!selectedOutbound} // Prevent proceeding without selecting at least an outbound train
                >
                    Proceed to Checkout <MoveRight className="ml-2 h-4 w-4" />
                </Button>
            </CardContent>
        </Card>
    );
}
