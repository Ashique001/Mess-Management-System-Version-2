import { useState } from 'react'

/** The values of a form. `bind('name')` connects one input to them. */
export function useForm(initial) {
  const [values, setValues] = useState(initial)

  const bind = (name) => ({
    value: values[name],
    onChange: (event) => {
      const { value } = event.target
      setValues((current) => ({ ...current, [name]: value }))
    },
  })

  return { values, bind, reset: () => setValues(initial) }
}
