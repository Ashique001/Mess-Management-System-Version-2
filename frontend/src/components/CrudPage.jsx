// Shared layout and behaviour of Members, Deposits and Market: a form on the
// left, a list on the right, and Save / Update / Delete / Clear.

import { useRef, useState } from 'react'
import DataTable from './DataTable.jsx'
import { useFeedback } from './Feedback.jsx'
import { PageHeader } from './ui.jsx'

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
    if (window.matchMedia('(max-width: 1100px)').matches) {
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
      <div className="split">
        <form ref={formRef} className="card form-card" onSubmit={handleAdd} noValidate>
          <h2 className="section-title">{formTitle}</h2>
          {renderFields({ form, setField, selectedId })}
          <div className="button-grid">
            <button type="submit" className={`btn btn-${addTone}`}>{addLabel}</button>
            <button type="button" className="btn btn-grey" onClick={handleUpdate}>Update</button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
            <button type="button" className="btn btn-plain" onClick={clear}>Clear</button>
          </div>
        </form>

        <section className="card list-card">
          <h2 className="section-title">{listTitle}</h2>
          <p className="hint">Select a row to edit or delete it.</p>
          <DataTable columns={columns} rows={rows} selectedKey={selectedId} onRowClick={select} />
        </section>
      </div>
    </>
  )
}
