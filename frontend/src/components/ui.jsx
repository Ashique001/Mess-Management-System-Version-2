// Small building blocks shared by the pages.

export function PageHeader({ title, subtitle }) {
  return (
    <header className="page-header">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </header>
  )
}

export function StatCard({ label, value, tone = 'dark', highlight = false, className = '' }) {
  return (
    <div className={`card stat ${highlight ? 'stat-highlight' : ''} ${className}`}>
      <div className="stat-label">{label}</div>
      <div className={`stat-value tone-${tone}`}>{value}</div>
    </div>
  )
}

export function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  )
}

export function DateRange({ from, to, onChange }) {
  return (
    <>
      <label className="inline-field">
        <span>From:</span>
        <input type="date" value={from} onChange={(e) => onChange({ from: e.target.value, to })} />
      </label>
      <label className="inline-field">
        <span>To:</span>
        <input type="date" value={to} onChange={(e) => onChange({ from, to: e.target.value })} />
      </label>
    </>
  )
}

export function InactiveTag() {
  return <span className="tag tag-off">Inactive</span>
}
