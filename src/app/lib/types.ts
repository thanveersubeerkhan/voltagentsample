export interface TableColumn {
  key: string
  label: string
  type?: 'text' | 'badge' | 'date'
}

export interface TableRow {
  id: string
  [key: string]: any
}

export interface DataTableProps {
  data: TableRow[]
  columns: TableColumn[]
}