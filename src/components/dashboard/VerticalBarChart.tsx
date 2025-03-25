"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { month: "Geneve", desktop: 186, mobile: 80 },
    { month: "Zurich", desktop: 305, mobile: 200 },
    { month: "Lugano", desktop: 237, mobile: 120 },
    { month: "Bern", desktop: 73, mobile: 190 },
    { month: "Interlaken", desktop: 209, mobile: 130 },
    { month: "Saint Gallen", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig

export function VerticalBarChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center">Issues per City</CardTitle>
                <CardDescription className={"text-center"}>January - June 2025</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="month"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey="desktop" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="desktop"
                            layout="vertical"
                            fill="#dc2626"
                            radius={4}
                        >
                            <LabelList
                                dataKey="month"
                                position="insideLeft"
                                offset={8}
                                className="fill-[--color-label]"
                                fontSize={12}
                            />
                            <LabelList
                                dataKey="desktop"
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 font-medium text-center leading-none">
                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="text-center text-muted-foreground">
                        Showing total tickets sold per station in the last 6 months
                    </div>
                </CardFooter>
        </Card>
    )
}
