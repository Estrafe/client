"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const serviceUptimeData = [
    { month: "Jan", uptime: 98.5, disruptions: 1.5 },
    { month: "Feb", uptime: 97.2, disruptions: 2.8 },
    { month: "Mar", uptime: 95.6, disruptions: 4.4 },
    { month: "Apr", uptime: 96.8, disruptions: 3.2 },
    { month: "May", uptime: 97.9, disruptions: 2.1 },
    { month: "Jun", uptime: 98.2, disruptions: 1.8 },
    { month: "Jul", uptime: 99.1, disruptions: 0.9 },
    { month: "Aug", uptime: 99.3, disruptions: 0.7 },
    { month: "Sep", uptime: 97.8, disruptions: 2.2 },
    { month: "Oct", uptime: 96.5, disruptions: 3.5 },
    { month: "Nov", uptime: 95.9, disruptions: 4.1 },
    { month: "Dec", uptime: 97.1, disruptions: 2.9 },
];

export function ServiceUptimeChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Service Uptime</CardTitle>
                <CardDescription>Train service reliability over the year</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={160}>
                    <LineChart data={serviceUptimeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[90, 100]} tickFormatter={(tick) => `${tick}%`} />
                        <Tooltip formatter={(value) => [`${value}%`, "Uptime"]} />
                        <Line type="monotone" dataKey="uptime" stroke="#16a34a" strokeWidth={3} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
