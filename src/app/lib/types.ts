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
export type ChartPoint = {
  label: string;   // x-axis label
  value: number;   // y-axis value
};

export interface ChartProps {
  title?: string;
  data: ChartPoint[];
}


export interface ChartProps {
  title?: string;
  data: ChartPoint[];
}

