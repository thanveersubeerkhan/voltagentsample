
"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { ChartProps } from "@/app/lib/types";

export function DynamicBarChart({ title, data }: ChartProps) {
  if (!data || data.length === 0) {
    return <div className="h-48 flex items-center justify-center text-gray-500">No data available</div>;
  }

  return (
    <div className="w-full space-y-2">
      {title && <h2 className="font-semibold">{title}</h2>}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
