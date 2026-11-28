import { useState } from 'react'
import { api } from '../lib/api.js'
import { useApi } from './useApi.js'

/** A paged, newest-first list with the changes a CrudPage needs. */
export function usePagedList(path) {
  const [page, setPage] = useState(1)
  const query = useApi(`${path}?page=${page}`)

  return {
    query,
    setPage,
    add: async (values) => {
      await api.post(path, values)
      setPage(1)
    },
    update: (id, values) => api.put(`${path}/${id}`, values),
    remove: async (id) => {
      await api.delete(`${path}/${id}`)
      // Do not stay on a page that has just become empty.
      if (page > 1 && query.data?.items.length === 1) setPage(page - 1)
    },
  }
}
