/**
 * A table. `columns` is [{ key, label, align?, className?, render? }].
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
  const cellClass = (column) =>
    [column.align && `align-${column.align}`, column.className].filter(Boolean).join(' ')

  return (
    <div className={`table-wrap ${className}`}>
      <table className={onRowClick ? 'clickable' : undefined}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className={cellClass(column)}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const key = rowKey(row)
            const selected = selectedKey != null && key === selectedKey
            return (
              <tr
                key={key}
                className={selected ? 'selected' : undefined}
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
                  <td key={column.key} className={cellClass(column)}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            )
          })}
          {rows.length === 0 && (
            <tr className="empty">
              <td colSpan={columns.length}>{emptyText}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
