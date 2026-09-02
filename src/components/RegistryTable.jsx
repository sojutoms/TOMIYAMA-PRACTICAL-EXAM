import { useMemo, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import shared from '../styles/shared.module.css'
import styles from './RegistryTable.module.css'

const BODY_TYPES = ['Electric', 'Acoustic', 'Bass', 'Classical']

const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor('model', { header: 'Item Name' }),
  columnHelper.accessor('bodyType', { header: 'Sub-category' }),
  columnHelper.accessor('brand', { header: 'Brand/Artist' }),
  columnHelper.accessor('stock', { header: 'Stock' }),
  columnHelper.accessor('manufacturer', { header: 'Label/Company' }),
  columnHelper.accessor('userRole', {
    header: 'User Role',
    cell: (info) => {
      const role = info.getValue() ?? 'Unknown'
      const badgeClass = shared[`badge${role}`] ?? shared.badgeUnknown
      return <span className={`${shared.badge} ${badgeClass}`}>{role}</span>
    },
  }),
]

export default function RegistryTable({ guitars, selectedId, onSelectRow }) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })
  const [filterBodyType, setFilterBodyType] = useState('')

  const filteredGuitars = useMemo(() => {
    if (!filterBodyType) return guitars
    return guitars.filter((g) => g.bodyType === filterBodyType)
  }, [guitars, filterBodyType])

  const table = useReactTable({
    data: filteredGuitars,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className={shared.card}>
      <div className={styles.tableToolbar}>
        <h2 className={shared.cardTitle}>Registry Table</h2>

        <div className={styles.toolbarControls}>
          <label className={styles.toolbarControl}>
            Filter sub-category:
            <select
              value={filterBodyType}
              onChange={(e) => setFilterBodyType(e.target.value)}
            >
              <option value="">All</option>
              {BODY_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className={styles.emptyCell}>No matching items.</td>
              </tr>
            )}
            {table.getRowModel().rows.map((row) => {
              const item = row.original
              const isSelected = item.id === selectedId
              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectRow(item.id)}
                  className={isSelected ? styles.rowSelected : ''}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.tablePagination}>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {Math.max(table.getPageCount(), 1)} &middot; {filteredGuitars.length} item(s)
        </span>
        <div className={styles.paginationControls}>
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`${shared.btn} ${shared.btnSecondary}`}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`${shared.btn} ${shared.btnSecondary}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
