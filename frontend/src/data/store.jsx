// The only place that knows where the data lives. For now it is the browser's
// localStorage. When the backend is ready, replace the loading and saving here
// with API calls; the pages already `await` every action.

import { createContext, useContext, useMemo, useRef, useState } from 'react'
import * as mutations from './mutations.js'
import { createSeedData } from './seed.js'

const STORAGE_KEY = 'mess-meal-data'

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    const lists = ['members', 'meals', 'deposits', 'expenses']
    if (saved?.version === 1 && saved.nextId && lists.every((k) => Array.isArray(saved[k]))) {
      return saved
    }
  } catch {
    // Unreadable or blocked storage: start from the sample data.
  }
  return createSeedData()
}

function save(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    throw new Error('Could not save. Browser storage is full or blocked.')
  }
}

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [data, setData] = useState(load)
  // Always holds the newest data, even before React has re-rendered.
  const latest = useRef(data)

  const actions = useMemo(() => {
    const commit = (next) => {
      save(next)
      latest.current = next
      setData(next)
    }
    const bound = Object.fromEntries(
      Object.entries(mutations)
        .filter(([name]) => name !== 'parseAmount')
        .map(([name, mutate]) => [
          name,
          async (...args) => commit(mutate(latest.current, ...args)),
        ]),
    )
    return { ...bound, resetData: async () => commit(createSeedData()) }
  }, [])

  const value = useMemo(() => ({ data, actions }), [data, actions])
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)
