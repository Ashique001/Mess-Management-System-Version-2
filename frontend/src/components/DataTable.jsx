const ALIGN = { right: 'text-right', center: 'text-center' }

const CELL = 'border-b border-slate-200 px-3 py-2.5 max-sm:px-1.5 max-sm:first:pl-2 max-sm:last:pr-2'

const cellClass = (column) =>
  [
    CELL,
    ALIGN[column.align] ?? 'text-left',
    column.hideSmall && 'max-sm:hidden',
  ]
    .filter(Boolean)
    .join(' ')

/**
 * A table. `columns` is [{ key, label, align?, wrap?, hideSmall?, render? }].
 * When `onRowClick` is given, rows can be selected by click or keyboard.
 */
export default function DataTable({
  columns,
  rows,
  rowKey = (row) => row.id,
  selectedKey,
  onRowClick,
  emptyText = 'No records yet.',
  className = '',
}) {
  return (
    <div className={`overflow-auto rounded-lg border border-slate-200 ${className}`}>
      <table className="w-full border-collapse text-xs sm:text-sm">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`sticky top-0 z-1 bg-slate-100 font-semibold text-slate-600 max-sm:align-bottom sm:whitespace-nowrap ${cellClass(column)}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&>tr:last-child>td]:border-b-0">
          {rows.map((row) => {
            const key = rowKey(row)
            const selected = selectedKey != null && key === selectedKey
            const hover = onRowClick ? 'cursor-pointer hover:bg-slate-50' : ''
            return (
              <tr
                key={key}
                className={selected ? 'cursor-pointer bg-blue-100' : hover}
                aria-selected={onRowClick ? selected : undefined}
                tabIndex={onRowClick ? 0 : undefined}
                onClick={onRowClick && (() => onRowClick(row))}
                onKeyDown={
                  onRowClick &&
                  ((event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      onRowClick(row)
                    }
                  })
                }
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`${column.wrap ? 'min-w-18 sm:min-w-28' : 'whitespace-nowrap'} ${cellClass(column)}`}
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            )
          })}
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-3 py-7 text-center text-slate-500">
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
