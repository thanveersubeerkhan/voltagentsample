import type React from "react"

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}
interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}
interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export function Table({ className = '', ...props }: TableProps) {
  return (
    <div className="w-full overflow-auto">
      <table className={`w-full caption-bottom text-sm ${className}`} {...props} />
    </div>
  )
}

export function TableHeader({ ...props }: TableHeaderProps) {
  return <thead {...props} />
}

export function TableBody({ ...props }: TableBodyProps) {
  return <tbody {...props} />
}

export function TableRow({ className = '', ...props }: TableRowProps) {
  return <tr className={`border-b transition-colors hover:bg-gray-50 ${className}`} {...props} />
}

export function TableHead({ className = '', ...props }: TableHeadProps) {
  return (
    <th
      className={`h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  )
}

export function TableCell({ className = '', ...props }: TableCellProps) {
  return (
    <td
      className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  )
}