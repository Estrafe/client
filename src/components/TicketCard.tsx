import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    MoveRight,
    Accessibility,
    Leaf,
    PawPrint,
    CircleHelp,
    ChevronDown,
    CircleX,
} from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface TicketCardProps {
    title: string
    departureTime: string
    arrivalTime: string
    price?: number
    highlight?: string
    accessible?: boolean
    co2Compliant?: boolean
    animalsEnabledCoach: boolean
    /**
     * Callback to notify parent when a class is selected,
     * passing the chosen class and the *final* (base + surcharge) price
     */
    onSelectTrain?: (
        className: "Standard" | "First Class" | "Sleeper",
        totalPrice: number
    ) => void
}

export default function TicketCard({
                                       title,
                                       departureTime,
                                       arrivalTime,
                                       price,
                                       highlight,
                                       accessible = false,
                                       co2Compliant = false,
                                       animalsEnabledCoach = false,
                                       onSelectTrain,
                                   }: TicketCardProps) {
    // Whether the user expanded the class selection panel
    const [showClassOptions, setShowClassOptions] = React.useState(false)

    // Track which class is hovered to update the top-right price
    const [hoveredClass, setHoveredClass] = React.useState<
        "Standard" | "First Class" | "Sleeper" | undefined
    >(undefined)

    // Toggle the class-options panel
    function handleToggleClassOptions() {
        setShowClassOptions((prev) => !prev)
    }

    // Surcharge logic per class
    function getClassPrice(basePrice: number, className: "Standard" | "First Class" | "Sleeper") {
        switch (className) {
            case "Standard":
                return basePrice
            case "First Class":
                return basePrice + 20 // e.g. +20 CHF
            case "Sleeper":
                return basePrice + 35 // e.g. +35 CHF (used for "Business" label below)
            default:
                return basePrice
        }
    }

    // Price to display: either base price (with "from") or hovered class price
    const displayedPrice =
        price !== undefined && hoveredClass
            ? getClassPrice(price, hoveredClass)
            : price

    // Helper to handle the user's selection click, so we pass the summed price back
    function handleSelectTrain(className: "Standard" | "First Class" | "Sleeper") {
        if (!price) return
        const summed = getClassPrice(price, className)
        onSelectTrain?.(className, summed)
    }

    return (
        <div
            className={cn(
                "relative w-full rounded-lg border border-gray-200 bg-white",
                "shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            )}
        >
            {/* Left accent strip */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-600 via-orange-300 to-orange-600 rounded-l-lg z-20" />

            {/* Subtle wave background */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <svg
                    className="w-full h-full text-orange-500"
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

            {/* Main content (top portion) */}
            <div className="relative z-20 p-4 ml-4 flex items-stretch">
                {/* Left column */}
                <div className="flex-1 space-y-3">
                    {/* Title row */}
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
                        {highlight && (
                            <Badge variant="secondary" className="text-xs sm:text-sm">
                                {highlight}
                            </Badge>
                        )}
                    </div>

                    {/* Times */}
                    <div className="flex items-center space-x-4">
                        {/* Departure */}
                        <div className="flex flex-col items-start">
              <span className="text-3xl font-bold text-gray-900">
                {departureTime}
              </span>
                            <span className="text-xs text-gray-500">Departure</span>
                        </div>
                        <MoveRight className="h-7 w-10 -mt-4 text-gray-400" />
                        {/* Arrival */}
                        <div className="flex flex-col items-start">
              <span className="text-3xl font-bold text-gray-900">
                {arrivalTime}
              </span>
                            <span className="text-xs text-gray-500">Arrival</span>
                        </div>
                    </div>

                    {/* Accessibility, CO₂, & Pets */}
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
                                                    There&#39;s only one pet-enabled coach in the train.
                                                    We&#39;ll advise you if we assigned you a seat in one.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            )}
                        </div>
                    )}
                    {!animalsEnabledCoach && !co2Compliant && !accessible && (
                        <p className="flex items-center gap-2 text-xs text-gray-600">
                            <CircleX className="h-4 w-4 text-red-500 hover:cursor-default" />
                            This train has no additional features.
                        </p>
                    )}
                </div>

                {/* Vertical divider */}
                <div className="mx-4 w-px bg-gray-300" />

                {/* Right column: price + "Select" button */}
                <div className="flex flex-col items-center justify-end w-24">
                    {price !== undefined && (
                        <>
                            {/* Show "from" only if NOT hovering a class */}
                            <span className="text-sm font-semibold text-gray-600">
                                {hoveredClass ? "" : "from"}
                            </span>
                            <span className="text-2xl text-center font-bold mb-5">
                                CHF {displayedPrice}
                            </span>
                        </>
                    )}
                    {/* Toggle the "attached" class-options panel */}
                    <Button
                        variant="outline"
                        className="flex items-center space-x-2"
                        onClick={handleToggleClassOptions}
                    >
                        <span>Select</span>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Attached "class options" panel */}
            {showClassOptions && (
                <div className="bg-gray-50 border-t border-gray-200 p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {/* Standard */}
                        <div
                            className="bg-white border rounded p-4 z-50 shadow-sm flex flex-col"
                            onMouseEnter={() => setHoveredClass("Standard")}
                            onMouseLeave={() => setHoveredClass(undefined)}
                        >
                            <h4 className="text-sm font-semibold mb-2">Standard</h4>
                            <ul className="text-xs text-gray-600 space-y-1 mb-3">
                                <li>Baggage: 1 × 23 kg</li>
                                <li>Carry-on baggage: 1 × 2 kg</li>
                                <li>Non-refundable</li>
                            </ul>
                            <Button
                                variant="default"
                                onClick={() => handleSelectTrain("Standard")}
                                className="mt-auto bg-orange-500"
                            >
                                Select Standard
                            </Button>
                        </div>

                        {/* "Upper Class" but calls onSelectTrain("First Class") */}
                        <div
                            className="bg-white border rounded p-4 z-50 shadow-sm flex flex-col"
                            onMouseEnter={() => setHoveredClass("First Class")}
                            onMouseLeave={() => setHoveredClass(undefined)}
                        >
                            <h4 className="text-sm font-semibold mb-2">Upper Class</h4>
                            <ul className="text-xs text-gray-600 space-y-1 mb-3">
                                <li>Baggage: 2 × 23 kg</li>
                                <li>Carry-on baggage: 2 × 5 kg</li>
                                <li>Priority check-in & boarding</li>
                            </ul>
                            <Button
                                variant="default"
                                onClick={() => handleSelectTrain("First Class")}
                                className="mt-auto bg-orange-500"
                            >
                                Select Upper
                            </Button>
                        </div>

                        {/* "Business" but calls onSelectTrain("Sleeper") */}
                        <div
                            className="bg-white border rounded p-4 z-50 shadow-sm flex flex-col"
                            onMouseEnter={() => setHoveredClass("Sleeper")}
                            onMouseLeave={() => setHoveredClass(undefined)}
                        >
                            <h4 className="text-sm font-semibold mb-2">Business</h4>
                            <ul className="text-xs text-gray-600 space-y-1 mb-3">
                                <li>Carry-on baggage: 5 x 5kg</li>
                                <li>Baggage: 3 × 23 kg</li>
                                <li>Priority check-in & boarding</li>
                                <li>Fully refundable</li>
                            </ul>
                            <Button
                                variant="default"
                                onClick={() => handleSelectTrain("Sleeper")}
                                className="mt-auto bg-orange-500"
                            >
                                Select Business
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
