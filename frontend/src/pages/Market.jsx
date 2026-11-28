import CrudPage from '../components/CrudPage.jsx'
import { Field, Input, Textarea } from '../components/ui.jsx'
import { usePagedList } from '../hooks/usePagedList.js'
import { formatDate, formatMoney, todayIso } from '../lib/format.js'

const emptyForm = () => ({ date: todayIso(), amount: '', description: '' })

const toForm = (expense) => ({
  date: expense.date,
  amount: String(expense.amount),
  description: expense.description,
})

const COLUMNS = [
  { key: 'date', label: 'Date', render: (e) => formatDate(e.date) },
  { key: 'amount', label: 'Amount', align: 'right', render: (e) => formatMoney(e.amount) },
  { key: 'description', label: 'Description', wrap: true },
]

export default function Market() {
  const list = usePagedList('/expenses')

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
      query={list.query}
      onPageChange={list.setPage}
      onAdd={list.add}
      onUpdate={list.update}
      onDelete={list.remove}
      renderFields={({ form, setField }) => (
        <>
          <Field label="Expense Date:">
            <Input type="date" value={form.date} onChange={setField('date')} />
          </Field>
          <Field label="Amount Spent (৳):">
            <Input
              inputMode="decimal"
              value={form.amount}
              onChange={setField('amount')}
              autoComplete="off"
            />
          </Field>
          <Field label="Bazar Items / Description:">
            <Textarea
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
