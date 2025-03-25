"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
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

const chartConfig = {
    ticketsSold: {
        label: "Tickets Sold",
    },
} satisfies ChartConfig;

export function StationsPieChart() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        async function fetchStationData() {
            try {
                const response = await fetch("http://localhost:8080/api/stations");
                if (!response.ok) {
                    throw new Error("Failed to fetch station data");
                }
                const data = await response.json();
                setChartData(
                    data.map((station: any) => ({
                        station: station.name,
                        ticketsSold: station.ticketsSold,
                        fill: `hsl(var(--chart-${Math.floor(Math.random() * 5) + 1}))`,
                    }))
                );
            } catch (error) {
                console.error("Error fetching station data:", error);
            }
        }

        fetchStationData();
    }, []);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Tickets Sold by Station</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey="ticketsSold" hideLabel />}
                        />
                        <Pie data={chartData} dataKey="ticketsSold">
                            <LabelList
                                dataKey="station"
                                className="fill-background"
                                stroke="none"
                                fontSize={12}
                                formatter={(value: keyof typeof chartConfig) =>
                                    chartConfig[value]?.label || value
                                }
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total tickets sold per station in the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
}
