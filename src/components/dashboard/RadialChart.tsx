"use client";

import { TrendingUp } from "lucide-react";
import { RadialBar, RadialBarChart } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

// 🎯 Fake Ticket Sales Data (Percentages)
const chartData = [
    { city: "Zurich", tickets: 30, fill: "hsl(var(--chart-1))" },
    { city: "Geneva", tickets: 25, fill: "hsl(var(--chart-2))" },
    { city: "Bern", tickets: 15, fill: "hsl(var(--chart-3))" },
    { city: "Lausanne", tickets: 12, fill: "hsl(var(--chart-4))" },
    { city: "Basel", tickets: 10, fill: "hsl(var(--chart-5))" },
    { city: "Lucerne", tickets: 8, fill: "hsl(var(--chart-6))" },
];

const chartConfig = {
    tickets: {
        label: "Tickets Sold (%)",
    },
    zurich: {
        label: "Zurich",
        color: "hsl(var(--chart-1))",
    },
    geneva: {
        label: "Geneva",
        color: "hsl(var(--chart-2))",
    },
    bern: {
        label: "Bern",
        color: "hsl(var(--chart-3))",
    },
    lausanne: {
        label: "Lausanne",
        color: "hsl(var(--chart-4))",
    },
    basel: {
        label: "Basel",
        color: "hsl(var(--chart-5))",
    },
    lucerne: {
        label: "Lucerne",
        color: "hsl(var(--chart-6))",
    },
} satisfies ChartConfig;

export function RadialChart() {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Tickets Sold per City</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-2">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[220px]"
                >
                    <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel nameKey="city" />}
                        />
                        <RadialBar dataKey="tickets" background />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Zurich leads with 30% of tickets sold! <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-center text-muted-foreground">
                    Showing ticket sales distribution for the last 6 months.
                </div>
            </CardFooter>
        </Card>
    );
}
