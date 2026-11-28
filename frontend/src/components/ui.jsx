// Small building blocks shared by the pages. All styling is Tailwind.

const BUTTONS = {
  blue: 'bg-blue-600 text-white',
  green: 'bg-emerald-700 text-white',
  grey: 'bg-slate-100 text-slate-800',
  danger: 'bg-red-50 text-red-600',
  plain: 'border-slate-200 bg-white text-slate-500',
  soft: 'bg-blue-50 text-blue-700',
}

export function Button({ variant = 'blue', type = 'button', className = '', ...props }) {
  return (
    <button
      type={type}
      className={`min-h-10 rounded-md border border-transparent px-4 py-2 text-sm font-semibold hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 ${BUTTONS[variant]} ${className}`}
      {...props}
    />
  )
}

export function Card({ as: Tag = 'section', padding = 'p-3.5 sm:p-4.5', className = '', ...props }) {
  return (
    <Tag
      className={`min-w-0 rounded-xl border border-slate-200 bg-white ${padding} ${className}`}
      {...props}
    />
  )
}

export function PageHeader({ title, subtitle }) {
  return (
    <header>
      <h1 className="text-lg font-bold sm:text-2xl">{title}</h1>
      {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
    </header>
  )
}

export function SectionTitle({ children }) {
  return <h2 className="mb-3 text-sm font-bold text-slate-500">{children}</h2>
}

export function Hint({ children, className = 'mb-2.5' }) {
  return <p className={`text-[13px] text-slate-500 ${className}`}>{children}</p>
}

// 16px text on phones stops iPhones from zooming in when a field is tapped.
const CONTROL =
  'min-h-10 rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-base sm:text-sm'

export function Input({ className = 'w-full', ...props }) {
  return <input className={`${CONTROL} ${className}`} {...props} />
}

export function Select({ className = 'w-full', ...props }) {
  return <select className={`${CONTROL} ${className}`} {...props} />
}

export function Textarea({ className = 'w-full', ...props }) {
  return <textarea className={`${CONTROL} ${className}`} {...props} />
}

export function Field({ label, children }) {
  return (
    <label className="mb-3.5 flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-slate-600">{label}</span>
      {children}
    </label>
  )
}

export function InlineField({ label, ...props }) {
  return (
    <label className="flex items-center gap-2 max-sm:w-full">
      <span className="text-sm font-semibold text-slate-600 max-sm:min-w-14">{label}</span>
      <Input className="min-w-0 max-sm:flex-1 sm:w-44" {...props} />
    </label>
  )
}

export function DateRange({ from, to, onChange }) {
  return (
    <>
      <InlineField
        label="From:"
        type="date"
        value={from}
        onChange={(e) => onChange({ from: e.target.value, to })}
      />
      <InlineField
        label="To:"
        type="date"
        value={to}
        onChange={(e) => onChange({ from, to: e.target.value })}
      />
    </>
  )
}

export const TONES = {
  dark: 'text-slate-900',
  green: 'text-emerald-700',
  red: 'text-red-600',
  amber: 'text-amber-700',
  blue: 'text-blue-600',
}

export function StatCard({ label, value, tone = 'dark', highlight = false, className = '' }) {
  const surface = highlight ? 'border-blue-600 bg-blue-600' : 'border-slate-200 bg-white'
  return (
    <div className={`min-w-0 rounded-xl border p-3.5 sm:p-4.5 ${surface} ${className}`}>
      <div className={`text-[13px] font-bold ${highlight ? 'text-blue-100' : 'text-slate-500'}`}>
        {label}
      </div>
      <div
        className={`text-xl font-bold wrap-anywhere sm:text-[26px] ${highlight ? 'text-white' : TONES[tone]}`}
      >
        {value}
      </div>
    </div>
  )
}

const TAGS = {
  green: 'bg-emerald-100 text-emerald-800',
  grey: 'bg-slate-100 text-slate-600',
  red: 'bg-red-100 text-red-800',
  amber: 'bg-amber-100 text-amber-800',
}

export function Tag({ tone = 'grey', children }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${TAGS[tone]}`}
    >
      {children}
    </span>
  )
}

export function InactiveTag() {
  return <Tag>Inactive</Tag>
}

export function Notice({ children }) {
  return (
    <p
      role="alert"
      className="rounded-xl border border-amber-300 bg-amber-50 px-4.5 py-3.5 text-amber-800"
    >
      {children}
    </p>
  )
}
