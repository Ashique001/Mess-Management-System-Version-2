import { useMemo } from 'react'
import CrudPage from '../components/CrudPage.jsx'
import { Field } from '../components/ui.jsx'
import { useData } from '../data/store.jsx'
import { formatDate, formatMoney, todayIso } from '../lib/format.js'

const emptyForm = () => ({ date: todayIso(), amount: '', description: '' })

const toForm = (expense) => ({
  date: expense.date,
  amount: String(expense.amount),
  description: expense.description,
})

const COLUMNS = [
  { key: 'id', label: 'ID', className: 'hide-small' },
  { key: 'date', label: 'Date', render: (e) => formatDate(e.date) },
  { key: 'amount', label: 'Amount', align: 'right', render: (e) => formatMoney(e.amount) },
  { key: 'description', label: 'Description', className: 'wrap' },
]

export default function Market() {
  const { data, actions } = useData()

  const rows = useMemo(
    () => [...data.expenses].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id),
    [data],
  )

  return (
    <CrudPage
      title="🛒 MARKET & BAZAR EXPENSES"
      formTitle="RECORD BAZAR EXPENSE"
      listTitle="GROCERY BAZAR VOUCHERS"
      noun="expense"
      addLabel="Save Expense"
      emptyForm={emptyForm}
      toForm={toForm}
      columns={COLUMNS}
      rows={rows}
      onAdd={actions.addExpense}
      onUpdate={actions.updateExpense}
      onDelete={actions.deleteExpense}
      renderFields={({ form, setField }) => (
        <>
          <Field label="Expense Date:">
            <input type="date" value={form.date} onChange={setField('date')} />
          </Field>
          <Field label="Amount Spent (৳):">
            <input
              inputMode="decimal"
              value={form.amount}
              onChange={setField('amount')}
              autoComplete="off"
            />
          </Field>
          <Field label="Bazar Items / Description:">
            <textarea
              rows={5}
              value={form.description}
              onChange={setField('description')}
              maxLength={500}
            />
          </Field>
        </>
      )}
    />
  )
}
