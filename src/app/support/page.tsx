"use client";

import React, { useState } from "react";
import FAQ from "@/components/FAQ";
import Header from "@/components/Header";
import Link from "next/link";
import { Headset } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface SupportTopic {
    title: string;
    description: string;
    link: string;
}

const topics: SupportTopic[] = [
    {
        title: "How to Book a Ticket?",
        description: "Follow our step-by-step guide to easily book your next journey.",
        link: "/support/booking",
    },
    {
        title: "Payment Issues",
        description: "Get help resolving common payment problems and secure your booking.",
        link: "/support/payment",
    },
    {
        title: "Refund & Cancellation",
        description: "Learn about our policies for refunds and how to cancel a booking.",
        link: "/support/refunds",
    },
    {
        title: "Ticket Pricing",
        description: "Understand fare rules, discounts, and special offers.",
        link: "/support/ticket-pricing",
    },
    {
        title: "Travel Policies",
        description: "Learn about our travel guidelines and safety measures.",
        link: "/support/travel-policies",
    },
    {
        title: "Account Management",
        description: "Manage your bookings, profile, and preferences.",
        link: "/support/account-management",
    },
];

export default function SupportPage() {
    const [selectedTopic, setSelectedTopic] = useState<SupportTopic | null>(null);

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header />
            <div className="container mx-auto px-4 py-8">
                {/* Support Center Title */}
                <div className="flex flex-col items-center text-center mb-12">
                    <Headset className="h-16 w-16 mb-2" />
                    <h1 className="text-4xl font-bold text-gray-800">Support Center</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        How can we help you today? Find answers and get assistance below.
                    </p>
                </div>

                {/* Popular Topics Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Popular Topics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {topics.map((topic) => (
                            <Dialog key={topic.title}>
                                <DialogTrigger asChild>
                                    <div
                                        className="bg-white rounded-lg shadow p-6 hover:shadow-md transition cursor-pointer"
                                        onClick={() => setSelectedTopic(topic)}
                                    >
                                        <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                                        <p className="text-gray-600">{topic.description}</p>
                                        <span className="mt-4 inline-block text-violet-estrafe hover:underline">
                      Learn More &rarr;
                    </span>
                                    </div>
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>{selectedTopic?.title}</DialogTitle>
                                        <DialogDescription>{selectedTopic?.description}</DialogDescription>
                                    </DialogHeader>
                                    <div className="mt-4">
                                        <Link
                                            href={selectedTopic?.link ?? "#"}
                                            className="inline-block bg-violet-estrafe text-white px-6 py-3 rounded-lg hover:bg-violet-estrafe-hover transition"
                                        >
                                            Visit Page
                                        </Link>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                    <FAQ />
                </div>

                {/* Contact Support Section */}
                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Still Need Help?</h2>
                    <p className="text-gray-600 mb-4">
                        If you couldn&apos;t find the answer you&apos;re looking for, our support team is here to help.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-violet-estrafe text-white px-6 py-3 rounded-lg hover:bg-violet-estrafe-hover transition"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}
