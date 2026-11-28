import CrudPage from '../components/CrudPage.jsx'
import { Field, InactiveTag, Input, Select, Tag } from '../components/ui.jsx'
import { useData } from '../data/store.jsx'

const emptyForm = () => ({ name: '', phone: '', status: 'Active' })

const toForm = (member) => ({
  name: member.name,
  phone: member.phone,
  status: member.active ? 'Active' : 'Inactive',
})

const toInput = ({ name, phone, status }) => ({ name, phone, active: status === 'Active' })

const COLUMNS = [
  { key: 'id', label: 'ID', hideSmall: true },
  { key: 'name', label: 'Name', wrap: true },
  { key: 'phone', label: 'Phone', render: (m) => m.phone || '—' },
  {
    key: 'active',
    label: 'Status',
    render: (m) => (m.active ? <Tag tone="green">Active</Tag> : <InactiveTag />),
  },
]

export default function Members() {
  const { data, actions } = useData()

  return (
    <CrudPage
      title="👥 MEMBER MANAGEMENT"
      formTitle="MEMBER DETAILS"
      listTitle="REGISTERED MEMBERS LIST"
      noun="member"
      addLabel="Add Member"
      emptyForm={emptyForm}
      toForm={toForm}
      columns={COLUMNS}
      rows={data.members}
      onAdd={(form) => actions.addMember(toInput(form))}
      onUpdate={(id, form) => actions.updateMember(id, toInput(form))}
      onDelete={actions.deleteMember}
      renderFields={({ form, setField }) => (
        <>
          <Field label="Full Name:">
            <Input value={form.name} onChange={setField('name')} maxLength={100} autoComplete="off" />
          </Field>
          <Field label="Phone Number:">
            <Input
              type="tel"
              value={form.phone}
              onChange={setField('phone')}
              maxLength={20}
              autoComplete="off"
            />
          </Field>
          <Field label="Status:">
            <Select value={form.status} onChange={setField('status')}>
              <option>Active</option>
              <option>Inactive</option>
            </Select>
          </Field>
        </>
      )}
    />
  )
}
