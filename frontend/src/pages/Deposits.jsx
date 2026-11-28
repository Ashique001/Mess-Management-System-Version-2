import { useMemo } from 'react'
import CrudPage from '../components/CrudPage.jsx'
import { Field, Input, Select } from '../components/ui.jsx'
import { useData } from '../data/store.jsx'
import { sortByName } from '../lib/calculations.js'
import { formatDate, formatMoney, todayIso } from '../lib/format.js'

const emptyForm = () => ({ memberId: '', date: todayIso(), amount: '' })

const toForm = (deposit) => ({
  memberId: String(deposit.memberId),
  date: deposit.date,
  amount: String(deposit.amount),
})

const COLUMNS = [
  { key: 'id', label: 'ID', hideSmall: true },
  { key: 'memberName', label: 'Member', wrap: true },
  { key: 'date', label: 'Date', render: (d) => formatDate(d.date) },
  { key: 'amount', label: 'Amount', align: 'right', render: (d) => formatMoney(d.amount) },
]

export default function Deposits() {
  const { data, actions } = useData()

  const rows = useMemo(() => {
    const names = new Map(data.members.map((m) => [m.id, m.name]))
    return data.deposits
      .map((d) => ({ ...d, memberName: names.get(d.memberId) ?? 'Unknown' }))
      .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
  }, [data])

  return (
    <CrudPage
      title="💳 MEMBER DEPOSIT MANAGEMENT"
      formTitle="NEW DEPOSIT ENTRY"
      listTitle="DEPOSIT TRANSACTION HISTORY"
      noun="deposit"
      addLabel="Save Deposit"
      addTone="green"
      emptyForm={emptyForm}
      toForm={toForm}
      columns={COLUMNS}
      rows={rows}
      onAdd={actions.addDeposit}
      onUpdate={actions.updateDeposit}
      onDelete={actions.deleteDeposit}
      renderFields={({ form, setField }) => {
        // Active members, plus the owner of the selected deposit if inactive.
        const options = sortByName(
          data.members.filter((m) => m.active || String(m.id) === form.memberId),
        )
        return (
          <>
            <Field label="Select Member:">
              <Select value={form.memberId} onChange={setField('memberId')}>
                <option value="">— Select —</option>
                {options.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}{m.active ? '' : ' (Inactive)'}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Deposit Date:">
              <Input type="date" value={form.date} onChange={setField('date')} />
            </Field>
            <Field label="Deposit Amount (৳):">
              <Input
                inputMode="decimal"
                value={form.amount}
                onChange={setField('amount')}
                autoComplete="off"
              />
            </Field>
          </>
        )
      }}
    />
  )
}
