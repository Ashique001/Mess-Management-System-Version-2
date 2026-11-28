// Shared layout and behaviour of Members, Deposits and Market: a form on the
// left, a list on the right, and Save / Update / Delete / Clear.

import { useRef, useState } from 'react'
import DataTable from './DataTable.jsx'
import { useFeedback } from './Feedback.jsx'
import Pagination from './Pagination.jsx'
import { Loaded } from './State.jsx'
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
  // A useApi query whose data is { items, page?, pages?, total? }.
  query,
  onPageChange,
  onAdd,
  onUpdate,
  onDelete,
  renderFields,
}) {
  const { notify, confirm } = useFeedback()
  const [form, setForm] = useState(emptyForm)
  const [selected, setSelected] = useState(null)
  const [busy, setBusy] = useState(false)
  const topRef = useRef(null)

  const setField = (name) => (event) => {
    const { value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const clear = () => {
    setForm(emptyForm())
    setSelected(null)
  }

  const select = (row) => {
    setSelected(row)
    setForm(toForm(row))
    // On narrow screens the form sits above the list, so bring it into view.
    if (window.matchMedia('(max-width: 69rem)').matches) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // One change at a time, so a double click cannot save a record twice.
  const run = async (action, successMessage) => {
    setBusy(true)
    try {
      await action()
      notify(successMessage)
      clear()
      query.reload()
    } catch (error) {
      notify(error.message, 'error')
    } finally {
      setBusy(false)
    }
  }

  const needSelection = () => {
    if (selected) return false
    notify(`Please select ${noun === 'expense' ? 'an' : 'a'} ${noun} first.`, 'warning')
    return true
  }

  const label = noun[0].toUpperCase() + noun.slice(1)

  const handleAdd = (event) => {
    event.preventDefault()
    if (!busy) run(() => onAdd(form), `${label} added successfully!`)
  }

  const handleUpdate = () => {
    if (needSelection()) return
    run(() => onUpdate(selected.id, form), `${label} updated successfully!`)
  }

  const handleDelete = async () => {
    if (needSelection()) return
    if (!(await confirm(`Are you sure you want to delete this ${noun}?`, 'Yes, delete'))) return
    run(() => onDelete(selected.id), `${label} deleted successfully!`)
  }

  const changePage = (page) => {
    clear()
    onPageChange(page)
  }

  return (
    <>
      <PageHeader title={title} />
      <div
        ref={topRef}
        className="grid scroll-mt-19 grid-cols-[minmax(0,1fr)] items-start gap-4.5 wide:grid-cols-[330px_minmax(0,1fr)]"
      >
        <Card as="form" onSubmit={handleAdd} noValidate>
          <SectionTitle>{formTitle}</SectionTitle>
          {/* Locked while saving, so nothing typed meanwhile gets cleared. */}
          <fieldset disabled={busy} className="min-w-0">
            {renderFields({ form, setField })}
          </fieldset>
          <div className="grid grid-cols-2 gap-2.5">
            <Button type="submit" variant={addTone} disabled={busy}>
              {addLabel}
            </Button>
            <Button variant="grey" onClick={handleUpdate} disabled={busy}>
              Update
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={busy}>
              Delete
            </Button>
            <Button variant="plain" onClick={clear} disabled={busy}>
              Clear
            </Button>
          </div>
        </Card>

        <Card>
          <SectionTitle>{listTitle}</SectionTitle>
          <Hint>Select a row to edit or delete it.</Hint>
          <Loaded query={query}>
            {({ items, page, pages, total }) => (
              <>
                <DataTable
                  className="max-h-[70vh] min-h-56 wide:max-h-[calc(100vh-290px)]"
                  columns={columns}
                  rows={items}
                  selectedKey={selected?.id}
                  onRowClick={select}
                />
                {onPageChange && (
                  <Pagination page={page} pages={pages} total={total} onChange={changePage} />
                )}
              </>
            )}
          </Loaded>
        </Card>
      </div>
    </>
  )
}
