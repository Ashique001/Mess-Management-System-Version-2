// Shared layout and behaviour of Members, Deposits and Market: a form on the
// left, a list on the right, and Save / Update / Delete / Clear.

import { useRef, useState } from 'react'
import DataTable from './DataTable.jsx'
import { useFeedback } from './Feedback.jsx'
import { Button, Card, Hint, PageHeader, SectionTitle } from './ui.jsx'

export default function CrudPage({
  title,
  formTitle,
  listTitle,
  noun,
  addLabel,
  addTone = 'blue',
  emptyForm,
  toForm,
  columns,
  rows,
  onAdd,
  onUpdate,
  onDelete,
  renderFields,
}) {
  const { notify, confirm } = useFeedback()
  const [form, setForm] = useState(emptyForm)
  const [selectedId, setSelectedId] = useState(null)
  const formRef = useRef(null)

  const setField = (name) => (event) => {
    const { value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const clear = () => {
    setForm(emptyForm())
    setSelectedId(null)
  }

  const select = (row) => {
    setSelectedId(row.id)
    setForm(toForm(row))
    // On narrow screens the form sits above the list, so bring it into view.
    if (window.matchMedia('(max-width: 69rem)').matches) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const run = async (action, successMessage) => {
    try {
      await action()
      notify(successMessage)
      clear()
    } catch (error) {
      notify(error.message, 'error')
    }
  }

  const needSelection = () => {
    if (selectedId != null) return false
    notify(`Please select ${noun === 'expense' ? 'an' : 'a'} ${noun} first.`, 'warning')
    return true
  }

  const label = noun[0].toUpperCase() + noun.slice(1)

  const handleAdd = (event) => {
    event.preventDefault()
    run(() => onAdd(form), `${label} added successfully!`)
  }

  const handleUpdate = () => {
    if (needSelection()) return
    run(() => onUpdate(selectedId, form), `${label} updated successfully!`)
  }

  const handleDelete = async () => {
    if (needSelection()) return
    if (!(await confirm(`Are you sure you want to delete this ${noun}?`, 'Yes, delete'))) return
    run(() => onDelete(selectedId), `${label} deleted successfully!`)
  }

  return (
    <>
      <PageHeader title={title} />
      <div ref={formRef} className="grid scroll-mt-19 grid-cols-[minmax(0,1fr)] items-start gap-4.5 wide:grid-cols-[330px_minmax(0,1fr)]">
        <Card as="form" onSubmit={handleAdd} noValidate>
          <SectionTitle>{formTitle}</SectionTitle>
          {renderFields({ form, setField, selectedId })}
          <div className="grid grid-cols-2 gap-2.5">
            <Button type="submit" variant={addTone}>{addLabel}</Button>
            <Button variant="grey" onClick={handleUpdate}>Update</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
            <Button variant="plain" onClick={clear}>Clear</Button>
          </div>
        </Card>

        <Card>
          <SectionTitle>{listTitle}</SectionTitle>
          <Hint>Select a row to edit or delete it.</Hint>
          <DataTable
            className="max-h-[70vh] min-h-56 wide:max-h-[calc(100vh-250px)]"
            columns={columns}
            rows={rows}
            selectedKey={selectedId}
            onRowClick={select}
          />
        </Card>
      </div>
    </>
  )
}
