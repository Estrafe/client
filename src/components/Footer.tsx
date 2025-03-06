"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-white text-gray-700">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row md:justify-between">
                    {/* Left Section: Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {/* Company Links */}
                        <div>
                            <h4 className="text-violet-estrafe text-lg font-bold mb-4">Company</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/about" className="hover:text-violet-estrafe-hover transition">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/careers" className="hover:text-violet-estrafe-hover transition">
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog" className="hover:text-violet-estrafe-hover transition">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/press" className="hover:text-violet-estrafe-hover transition">
                                        Press
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/* Services Links */}
                        <div>
                            <h4 className="text-violet-estrafe text-lg font-bold mb-4">Services</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/tickets" className="hover:text-violet-estrafe-hover transition">
                                        Book Tickets
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/routes" className="hover:text-violet-estrafe-hover transition">
                                        Popular Routes
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/support" className="hover:text-violet-estrafe-hover transition">
                                        Customer Support
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/faqs" className="hover:text-violet-estrafe-hover transition">
                                        FAQs
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/* Legal Links */}
                        <div>
                            <h4 className="text-violet-estrafe text-lg font-bold mb-4">Legal</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/terms" className="hover:text-violet-estrafe-hover transition">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/privacy" className="hover:text-violet-estrafe-hover transition">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/cookies" className="hover:text-violet-estrafe-hover transition">
                                        Cookie Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/compliance" className="hover:text-violet-estrafe-hover transition">
                                        Compliance
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Section: Estrafe Logo */}
                    <div className="mt-8 md:mt-0 flex items-center justify-center">
                        <Link href="/" className="text-3xl font-bold text-violet-estrafe">
                            <Image
                                src="/estrafe.svg"
                                alt={"Estrafe logo"}
                                width={200}
                                height={200}
                                className="text-violet-estrafe fill-violet-estrafe"
                            />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 border-t border-gray-200 py-4">
                <div className="max-w-7xl mx-auto px-4 text-center text-sm">
                    &copy; {new Date().getFullYear()} Estrafe. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
