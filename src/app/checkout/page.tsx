"use client";

import React from "react";
import Header from "@/components/Header";
import CheckoutTicketSummary from "@/components/CheckoutTicketSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {HeartCrack, Lock, MoveLeft} from "lucide-react";
import ExpiryDateInput from "@/components/ExpiryDateInput";
import CardNumberInput from "@/components/CardNumberInput";
import formatTime from "@/app/tickets/page";

// Define the TrainTicket type
export interface TrainTicket {
    id: number;
    title: string;
    departureTime: string;
    arrivalTime: string;
    departureStation: string;
    arrivalStation: string;
    price: number;
    seatClass?: string;
    accessible?: boolean;
    co2Compliant?: boolean;
    animalsEnabledCoach?: boolean;
    seatClasses?: string[];
}

export default function CheckoutPage() {
    // Retrieve query parameters from the URL
    const searchParams = useSearchParams();
    const outboundParam = searchParams.get("outbound");
    const returnParam = searchParams.get("return");

    // Parse JSON strings (if they exist)
    const selectedOutbound: TrainTicket | null = outboundParam
        ? JSON.parse(decodeURIComponent(outboundParam))
        : null;
    const selectedReturn: TrainTicket | null = returnParam
        ? JSON.parse(decodeURIComponent(returnParam))
        : null;

    // If no trains are selected, display a message
    if (!selectedOutbound && !selectedReturn) {
        return (
            <div className="bg-slate-50 min-h-screen flex flex-col">
                <Header />
                <div className="mt-16 text-center space-y-4">
                    <h1 className="text-3xl font-bold text-gray-800 flex flex-col items-center justify-center">
                        <HeartCrack className="mb-4 h-20 w-auto" />
                        No Trains Selected
                    </h1>
                    <p className="text-gray-600">
                        Please select a train from our tickets page to continue with the checkout.
                    </p>
                    <Link href="/tickets">
                        <Button className="bg-violet-estrafe hover:bg-violet-estrafe-hover text-white mt-5">
                            Go to Tickets
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
    // Calculate the subtotal
    const subtotal =
        (selectedOutbound ? selectedOutbound.price : 0) +
        (selectedReturn ? selectedReturn.price : 0);

    // Calculate additional fees and taxes
    const vat = subtotal * 0.21;
    const serviceFee = 3.0; // e.g., booking fee
    const seatFee = 2.5; // e.g., seat selection fee
    const peakSurcharge = 0; // Optional surcharge logic
    const grandTotal = subtotal + vat + serviceFee + seatFee + peakSurcharge;

    // Client information state
    const [clientName, setClientName] = React.useState("");
    const [clientEmail, setClientEmail] = React.useState("");
    const [clientPhone, setClientPhone] = React.useState("");
    const [clientAddress, setClientAddress] = React.useState("");
    const [clientExpiryDate, setClientExpiryDate] = React.useState("");
    const [clientCardNumber, setClientCardNumber] = React.useState("");
    const [isValid, setIsValid] = React.useState(true);

    return (
        <div className="bg-slate-50 min-h-screen relative">
            <Header />

            <div className="pt-12 pb-20 relative z-10">
                <div className="mx-auto max-w-5xl px-4">
                    {/* Page Title */}
                    <div className="text-center space-y-3 mb-10">
                        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
                        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                            Please review your ticket details, provide your personal information, and enter your payment details below to complete your purchase.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column: Ticket Summary & Price Breakdown */}
                        <div className="space-y-6">
                            {/* Ticket Summary Cards */}
                            {selectedOutbound && (
                                <CheckoutTicketSummary
                                    label="Outbound"
                                    title={selectedOutbound.title}
                                    departureTime={selectedOutbound.departureTime}
                                    arrivalTime={selectedOutbound.arrivalTime}
                                    departureStation={selectedOutbound.departureStation}
                                    arrivalStation={selectedOutbound.arrivalStation}
                                    price={selectedOutbound.price}
                                    seatClass={selectedOutbound.seatClass}
                                    accessible={selectedOutbound.accessible}
                                    co2Compliant={selectedOutbound.co2Compliant}
                                    animalsEnabledCoach={selectedOutbound.animalsEnabledCoach}
                                />
                            )}
                            {selectedReturn && (
                                <CheckoutTicketSummary
                                    label="Return"
                                    title={selectedReturn.title}
                                    departureTime={selectedReturn.departureTime}
                                    arrivalTime={selectedReturn.arrivalTime}
                                    departureStation={selectedReturn.departureStation}
                                    arrivalStation={selectedReturn.arrivalStation}
                                    price={selectedReturn.price}
                                    seatClass={selectedReturn.seatClass}
                                    accessible={selectedReturn.accessible}
                                    co2Compliant={selectedReturn.co2Compliant}
                                    animalsEnabledCoach={selectedReturn.animalsEnabledCoach}
                                />
                            )}

                            {/* Expanded Price Breakdown */}
                            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Price Breakdown</h3>
                                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                    <span>Subtotal</span>
                                    <span>CHF {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                    <span>VAT (21%)</span>
                                    <span>CHF {vat.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                    <span>Service Fee</span>
                                    <span>CHF {serviceFee.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                    <span>Seat Selection</span>
                                    <span>CHF {seatFee.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                    <span>Peak Surcharge</span>
                                    <span>CHF {peakSurcharge.toFixed(2)}</span>
                                </div>
                                <div className="my-2 h-px bg-gray-200" />
                                <div className="flex items-center justify-between text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>CHF {grandTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Payment & Client Information */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Payment & Client Information
                            </h2>
                            <form className="space-y-5">
                                {/* Client Information */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name
                                        </label>
                                        <Input
                                            placeholder="Miguel Oreiro"
                                            className="w-full text-sm"
                                            value={clientName}
                                            onChange={(e) => setClientName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <Input
                                            placeholder="miguel.oreiro@estrafe.com"
                                            className="w-full text-sm"
                                            value={clientEmail}
                                            type="email"
                                            onChange={(e) => setClientEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <Input
                                            placeholder="+1 (555) 123-4567"
                                            className="w-full text-sm"
                                            value={clientPhone}
                                            onChange={(e) => setClientPhone(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Address
                                        </label>
                                        <Input
                                            placeholder="Calle Del Pez, 12, 28015, Madrid, España"
                                            className="w-full text-sm"
                                            value={clientAddress}
                                            onChange={(e) => setClientAddress(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Payment Details
                  </span>
                                </div>

                                {/* Payment Fields */}
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Cardholder Name
                                        </label>
                                        <Input placeholder="John Doe" className="w-full text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Card Number
                                        </label>
                                        <CardNumberInput value={clientCardNumber} onChange={setClientCardNumber} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Expiry Date
                                            </label>
                                            <ExpiryDateInput value={clientExpiryDate} onChange={setClientExpiryDate} setIsValid={setIsValid} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                CVV
                                            </label>
                                            <Input placeholder="123" className="w-full text-sm" maxLength={3} />
                                        </div>
                                    </div>
                                </div>

                                {/* Pay Now Button */}
                                <div className="pt-4">
                                    <Button className="bg-violet-estrafe hover:bg-violet-estrafe-hover text-white w-full">
                                        <Lock />
                                        Pay Now
                                    </Button>
                                    <div className="flex justify-center mt-1">
                                        <img src="/visa.svg" className="h-9 w-auto" />
                                        <img src="/mastercard.svg" className="h-9 w-auto" />
                                        <img src="/amex.svg" className="h-9 w-auto" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Back to Tickets Link */}
                    <div className="mt-10 text-center">
                        <Link href="/">
                            <Button variant="ghost" className="text-violet-estrafe hover:bg-transparent hover:text-violet-estrafe hover:underline">
                                <MoveLeft />
                                Back to Tickets
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
