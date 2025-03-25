'use client'

import {Globe, Shield, TrendingUp} from "lucide-react";
import React, {useEffect} from "react";

export default function HeroSectionModule() {
    const [title, setTitle] = React.useState("Why Book with Estrafe?");
    const [description, setDescription] = React.useState("Enjoy modern, reliable, and comfortable travel with our extensive network,\n" +
        "                    exceptional service, and competitive fares.");

    useEffect(() => {

    },[title])

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-4">
                    {title ? title : "No title given"}
                </h2>
                <p className="text-gray-600 dark:text-gray-100 text-center max-w-2xl mx-auto mb-8">
                    {description ? description : "No description given"}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm bg-white">
                        <Globe className="h-12 w-12 text-[#b91c1d] mb-3" />
                        <h3 className="text-xl font-semibold text-gray-800">Global Reach</h3>
                        <p className="text-sm text-gray-600">
                            Connect with top cities and hidden gems across Switzerland.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm bg-white">
                        <Shield className="h-12 w-12 text-[#b91c1d] mb-3" />
                        <h3 className="text-xl font-semibold text-gray-800">Safety First</h3>
                        <p className="text-sm text-gray-600">
                            Travel securely with our modern, well-maintained fleet.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm bg-white">
                        <TrendingUp className="h-12 w-12 text-[#b91c1d] mb-3" />
                        <h3 className="text-xl font-semibold text-gray-800">Great Value</h3>
                        <p className="text-sm text-gray-600">
                            Enjoy competitive prices all over the continent with no hidden fees.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
