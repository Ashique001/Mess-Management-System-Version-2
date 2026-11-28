# Mess Meal Management — Website

React app (Vite and Tailwind CSS) that talks to the API in `../backend`.

## Run

Needs Node.js 22.22 or newer. Start the API first. Without a database of your
own, run `npm run demo` in `../backend`.

```sh
npm install
npm run dev        # http://localhost:5173
npm test
npm run lint
npm run build      # production files in dist/
```

In development, requests to `/api` are forwarded to `http://localhost:5000`.
For a deployed site set `VITE_API_URL` (see `.env.example`).

## Layout

| Folder | Contents |
|---|---|
| `src/pages` | One file per screen |
| `src/components` | Layout, tables, form pages, messages, small UI pieces |
| `src/auth` | The logged-in account and what each role sees |
| `src/hooks` | Loading data and handling forms |
| `src/lib` | API client, login token, date and money formats |

## Conventions

- Style with Tailwind classes. `src/index.css` holds only the theme and a few
  base rules.
- All requests go through `src/lib/api.js`.
- The server enforces every permission and rule. The website only shows what a
  role may use.
