import CrudPage from '../components/CrudPage.jsx'
import { ErrorState } from '../components/State.jsx'
import { Field, Input, Select } from '../components/ui.jsx'
import { useApi } from '../hooks/useApi.js'
import { usePagedList } from '../hooks/usePagedList.js'
import { formatDate, formatMoney, todayIso } from '../lib/format.js'

const emptyForm = () => ({ memberId: '', date: todayIso(), amount: '' })

const toForm = (deposit) => ({
  memberId: deposit.memberId,
  date: deposit.date,
  amount: String(deposit.amount),
})

const COLUMNS = [
  { key: 'memberName', label: 'Member', wrap: true },
  { key: 'date', label: 'Date', render: (d) => formatDate(d.date) },
  { key: 'amount', label: 'Amount', align: 'right', render: (d) => formatMoney(d.amount) },
]

export default function Deposits() {
  const list = usePagedList('/deposits')
  const members = useApi('/members')

  return (
    <>
      {members.error && <ErrorState error={members.error} onRetry={members.reload} />}
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
        query={list.query}
        onPageChange={list.setPage}
        onAdd={list.add}
        onUpdate={list.update}
        onDelete={list.remove}
        renderFields={({ form, setField }) => {
          // Active members, plus the owner of the selected deposit if inactive.
          const options = (members.data?.items ?? []).filter(
            (m) => m.active || m.id === form.memberId,
          )
          return (
            <>
              <Field label="Select Member:">
                <Select value={form.memberId} onChange={setField('memberId')}>
                  <option value="">{members.loading ? 'Loading…' : '— Select —'}</option>
                  {options.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                      {m.active ? '' : ' (Inactive)'}
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
    </>
  )
}
