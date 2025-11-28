"use client"

import { useEffect, useState } from "react"
import { DataTable } from "@/componets"
import { ChatInput } from "@/componets"
import type { TableColumn,TableRow } from "./lib/types"

export default function Home() {
  const [tableData, setTableData] = useState<TableRow[]>([])
  const [columns, setColumns] = useState<TableColumn[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [prompt, setPrompt] = useState("")

  const handleSendPrompt = async (message: string) => {
    setPrompt(message)
    setIsLoading(true)

    
  const res = await fetch("https://voltagent.onrender.com/agents/db-agent/object", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
  "input": message,
  "schema": {
    "type": "object",
    "properties": {
      "data": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": { "type": "string" }
          },
          "required": ["id"],
          "additionalProperties": true
        }
      },
      "columns": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "key": { "type": "string" },
            "label": { "type": "string" },
            "type": {
              "type": "string",
              "enum": ["text", "badge", "date"]
            }
          },
          "required": ["key", "label"]
        }
      }
    },
    "required": ["data", "columns"]
  }
}
)
  });

  const data = await res.json();
  console.log(data.data.data)
   console.log(data.columns)
  setColumns(data.data.columns)
 setTableData(data.data.data)
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
          ) : tableData.length > 0 ? (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Results for: {prompt}</h2>
              <DataTable data={tableData} columns={columns} />
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