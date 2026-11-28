import { Button } from './ui.jsx'

export default function Pagination({ page, pages, total, onChange }) {
  if (pages <= 1) return null
  return (
    <nav aria-label="Pages" className="mt-3 flex items-center justify-between gap-3">
      <Button variant="grey" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        ← Newer
      </Button>
      <span className="text-center text-[13px] text-slate-500">
        Page {page} of {pages} ({total} records)
      </span>
      <Button variant="grey" disabled={page >= pages} onClick={() => onChange(page + 1)}>
        Older →
      </Button>
    </nav>
  )
}
