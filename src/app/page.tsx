"use client"

import { useEffect, useState } from "react"
import { DataTable } from "@/componets"
import { ChatInput } from "@/componets"
import type { ChartProps, TableColumn,TableRow } from "./lib/types"
import { DynamicBarChart } from "@/componets/DynamicBarChart"
import { DynamicLineChart } from "@/componets/DynamicLineChart"
import { DynamicRoundChart } from "@/componets/DynamicRoundChart"

export default function Home() {
  const [tableData, setTableData] = useState<TableRow[]>([])
  const [columns, setColumns] = useState<TableColumn[]>( [])
  const [chart, setchart] = useState<ChartProps>()
  const [isLoading, setIsLoading] = useState(false)
  const [prompt, setPrompt] = useState("")

  const handleSendPrompt = async (message: string) => {
    setPrompt(message)
    setIsLoading(true)

    
  const res = await fetch("https://voltagent.onrender.com/api/db", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
  "input": message,
  "schema":""
}
)
  });

  const data = await res.json();
  console.log(data)
//   setColumns(data.columns)
//  setTableData(data.data)
 setchart(data.chart)
 setIsLoading(false)
 


  }
  useEffect(() => {
  
  }, [tableData,columns]);

  return (
    <main className="flex min-h-screen flex-col gap-8 bg-gray-50 p-6">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Data Dashboard</h1>
          <p className="mt-2 text-gray-600">Enter a prompt to load table data</p>
        </div>

        {/* Table Section */}
        <div className="mb-8 min-h-48 rounded-lg border border-gray-300 bg-white p-6">
          {isLoading ? (
            <div className="flex h-48 items-center justify-center">
              <div className="text-center">
                <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto"></div>
                <p className="text-gray-600">Loading data...</p>
              </div>
            </div>
          ) : chart ? (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Results for: {prompt}</h2>
              <div>

              </div>
              <DataTable data={tableData} columns={columns} />
              <DynamicBarChart
  title={chart?.title}
  data={chart?.data||[]}
/>
<DynamicLineChart
 
   title={chart?.title}
  data={chart?.data||[]}
/>
<DynamicRoundChart
   title={chart?.title}
  data={chart?.data||[]}
/>



            </div>
          ) : (
            <div className="flex h-48 items-center justify-center">
              <p className="text-center text-gray-600">Enter a prompt below to load table data</p>
            </div>
          )}
        </div>

        {/* Chat Input Section */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6">
          <ChatInput
            onSendMessage={handleSendPrompt}
            placeholder="Enter a prompt to load data (try 'users' or 'products')..."
            disabled={isLoading}
          />
        </div>

        {/* Spacing for fixed input */}
        <div className="h-20"></div>
      </div>
    </main>
  )
}