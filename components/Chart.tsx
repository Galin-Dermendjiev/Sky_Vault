"use client";

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const chartData = [
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]
export default function Chart() {
  return (
    <Card className="chart gap-0">
      <CardContent className="flex flex-1 items-center p-0">
         <ChartContainer
          config={chartConfig}
          className="chart-container"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-70}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10}  />
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
                          82%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 30}
                          className="fill-white text-xl"
                        >
                          Space used
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      

      </CardContent>
      <CardFooter className="chart-details flex flex-col">
        <div className="chart-title">Available Storage</div>
        <div className="chart-description">82GB / 128 GB</div>
      </CardFooter>
    </Card>
  );
}

       