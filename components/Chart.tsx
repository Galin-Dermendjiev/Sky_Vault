"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { calculatePercentage, convertFileSize } from "@/lib/utils";

const chartConfig = {
  size: {
    label: "Size",
  },
  used: {
    label: "Used",
    color: "white",
  },
} satisfies ChartConfig;

export default function Chart({ used = 0 }: { used: number }) {
  const percentage = calculatePercentage(used)

  // === Arc configuration ===
  const startAngle = 240; 
const arcSpan = 300;
const fillAngle = (percentage / 100) * arcSpan;
const endAngle = startAngle - fillAngle; // clockwise

  const chartData = [
    { name: "used", value: percentage, fill: "white" },
  ];

  return (
    <Card className="chart gap-0">
      <CardContent className="flex flex-1 items-center p-0">
        <ChartContainer config={chartConfig} className="chart-container">
          <RadialBarChart
            data={chartData}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={80}
            outerRadius={110}
          >
            {/* Background ring */}
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              polarRadius={[86, 74]}
            />

            <RadialBar
              dataKey="value"
              cornerRadius={10}
              background
              isAnimationActive={true}
              animationDuration={900}
              animationEasing="ease-out"
            />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="chart-total-percentage"
                        >
                          {percentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-white/70"
                        >
                          Space used
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="chart-details flex flex-col">
        <div className="chart-title">Available Storage</div>
        <div className="chart-description">
          {convertFileSize(used)} / 2 GB
        </div>
      </CardFooter>
    </Card>
  );
}
