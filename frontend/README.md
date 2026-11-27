# Mess Meal Management — Frontend

React version of the desktop app in `../MessMealManagement`.

## Run

Needs Node.js 22.22 or newer.

```sh
npm install
npm run dev        # http://localhost:5173
npm test           # calculation and validation tests
npm run build      # production files in dist/
```

## Data

There is no backend yet. The app starts with made-up sample data and saves your
changes in the browser (`localStorage`). **Reset data** in the sidebar restores
the sample data.

## Layout

| Folder | Contents |
|---|---|
| `src/pages` | One file per screen |
| `src/components` | Layout, tables, form pages, messages |
| `src/lib` | Meal rate and report calculations, date and money formats |
| `src/data` | Sample data, validation rules and storage |

To connect the backend, change `src/data/store.jsx`. The rules in
`src/data/mutations.js` must also be enforced by the server.

## Rules

- Meal rate = market cost ÷ number of meals.
- Balance = deposit − (meals × meal rate), for the chosen period only.
- Reports include inactive members who have records in the period.
- A member with meals or deposits cannot be deleted, only set to Inactive.
