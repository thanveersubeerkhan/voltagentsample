import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

import { Badge } from "./ui/badge"
import type { DataTableProps } from "@/app/lib/types"


export function DataTable({ data, columns }: DataTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderCell = (value: any, column: any) => {
    if (column.type === 'badge') {
      return <Badge className={getStatusColor(value)}>{value}</Badge>
    }
    
    if (column.type === 'date' && typeof value === 'string') {
      return new Date(value).toLocaleDateString()
    }
    
    return value
  }

  return (
    <div className="rounded-lg border border-gray-300">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={`${row.id}-${column.key}`}>
                  {renderCell(row[column.key], column)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}