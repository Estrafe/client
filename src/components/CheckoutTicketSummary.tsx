"use client";

import React from "react";
import {Accessibility, Leaf, PawPrint, CircleHelp, MoveRight} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {formatTime} from "@/app/tickets/page";

export interface CheckoutTicketSummaryProps {
  label?: string;              // e.g. "Outbound" or "Return"
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
}

/**
 * A minimal summary card for use in the Checkout page.
 * Inspired by TicketCard, but simplified (no "Select" button).
 */
export default function CheckoutTicketSummary({
  label,
  title,
  departureTime,
  arrivalTime,
  departureStation,
  arrivalStation,
  price,
  seatClass,
  accessible,
  co2Compliant,
  animalsEnabledCoach,
}: CheckoutTicketSummaryProps) {
  console.log("departureTime:", departureTime);
  console.log("arrivalTime:", arrivalTime);
  return (
    <div className="relative w-full rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Left accent strip */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-estrafe via-violet-estrafe-active/40 to-violet-estrafe rounded-l-lg z-20" />

      {/* Subtle wave background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg
          className="w-full h-full text-violet-estrafe/50"
          viewBox="0 0 1440 320"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,64L80,101.3C160,139,320,213,480,250.7C640,288,800,288,960,277.3C1120,267,1280,245,1360,234.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-20 p-4 ml-4 space-y-3">
        {/* Optional label (e.g. "Outbound" or "Return") */}
        {label && (
          <div className="flex flex-row justify-between text-sm text-gray-900">
            <h4 className="text-sm font-semibold text-gray-700">{label}</h4>
            <h4 className="text-sm font-semibold text-gray-700">26/04/2025</h4>
          </div>
        )}

        {/* Times row */}
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-start">
            <p>{departureStation}</p>
            <span className="text-2xl font-bold text-gray-900">{departureTime}</span>
            <span className="text-xs text-gray-500">Departure</span>
          </div>
          <div className="text-lg">
            <MoveRight className="h-5 w-5 text-gray-400 -mt-4" />
          </div>
          <div className="flex flex-col items-start">
            <p>{arrivalStation}</p>
            <span className="text-2xl font-bold text-gray-900">{arrivalTime}</span>
            <span className="text-xs text-gray-500">Arrival</span>
          </div>
        </div>

        {/* Title & seat class */}
        <div>
          <p className="text-sm font-medium text-gray-700">{title}</p>
          {seatClass && (
            <p className="text-xs text-gray-500">Seat Class: {seatClass}</p>
          )}
        </div>

        {/* Accessibility / CO2 / Animals */}
        {(accessible || co2Compliant || animalsEnabledCoach) && (
          <div className="flex flex-wrap items-center gap-3">
            {accessible && (
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Accessibility className="h-4 w-4 text-emerald-600" />
                <span>Accessible</span>
              </div>
            )}
            {co2Compliant && (
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Leaf className="h-4 w-4 text-green-500" />
                <span>CO₂ Compliant</span>
              </div>
            )}
            {animalsEnabledCoach && (
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <PawPrint className="h-4 w-4 text-yellow-900" />
                <span>Pets allowed</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleHelp className="h-3 w-3 text-gray-700 hover:cursor-default" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        There is only one pet-enabled coach in each train.
                        We’ll advise if your seat is in that coach.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-bold text-gray-900">CHF {price}</p>
        </div>
      </div>
    </div>
  );
}
