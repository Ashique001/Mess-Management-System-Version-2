# Mess Meal Management — API

The server of a multi-tenant SaaS for running a mess (shared meals). Express,
MongoDB and JSON Web Tokens. The website is in `../frontend`.

- [How it works](#how-it-works)
- [Try it without a database](#try-it-without-a-database)
- [Run with your own database](#run-with-your-own-database)
- [Settings](#settings)
- [API reference](#api-reference)
- [Deploy to Vercel and MongoDB Atlas](docs/DEPLOYMENT.md)

## How it works

One installation serves many messes. Each mess is a **tenant** and sees only its
own records.

| Role | Who | Can |
|---|---|---|
| Super admin | You, the platform owner | Approve, suspend and delete messes, set member limits, reset passwords. Cannot read a mess's meals or money through the API. |
| Mess admin | The person who registered the mess | Everything a manager can, plus add and remove managers and edit mess details |
| Manager | Appointed by the mess admin | Members, deposits, market expenses, meals and reports |

Mess **members** (the people who eat) are records, not logins.

### Joining

1. A mess registers on the website. It starts as **pending**.
2. The super admin approves it. It becomes **active**.
3. The mess admin adds members and, if wanted, managers.

The super admin can also create an active mess directly, and can suspend one at
any time. Set `SIGNUP_AUTO_APPROVE=true` to skip step 2.

### Rules

- Meal rate = market cost ÷ number of meals.
- Balance = deposit − (meals × meal rate), for the chosen period only.
- Reports include inactive members who have records in the period.
- A member with meals or deposits cannot be deleted, only set to Inactive.
- Each mess has a limit on active members (50 unless the super admin changes it)
  and at most 10 managers.

## Try it without a database

Needs Node.js 22.12 or newer.

```sh
npm install
npm run demo          # API on http://localhost:5000
```

This starts a temporary MongoDB on your computer with sample data. The first run
downloads MongoDB (several hundred MB). Everything is lost when you stop it.

| Login | Role |
|---|---|
| `owner@demo.test` | Super admin |
| `admin@demo.test` | Mess admin |
| `manager@demo.test` | Manager |
| `pending@demo.test` | Admin of a mess waiting for approval |

The password is `demo-password` for all of them. Then run `npm run dev` in
`../frontend`.

## Run with your own database

1. Copy the example settings: `cp .env.example .env`
2. Fill in `MONGODB_URI`, `JWT_SECRET`, `SUPERADMIN_EMAIL` and
   `SUPERADMIN_PASSWORD`.
3. Start: `npm run dev`
4. Check <http://localhost:5000/api/health>. It answers `{"status":"ok"}`.

The super admin is created on the first start.

## Settings

All settings are environment variables. `.env` is for your computer and is
never committed.

| Name | Needed | Meaning |
|---|---|---|
| `MONGODB_URI` | Yes | MongoDB connection string, including a database name |
| `JWT_SECRET` | In production | Signs logins. 32 or more random characters. Changing it logs everyone out. On your computer a temporary one is used if empty. |
| `CORS_ORIGIN` | In production | Website addresses allowed to call the API, comma separated. Default in development: `http://localhost:5173` |
| `SUPERADMIN_EMAIL` | For the first start | Super admin login |
| `SUPERADMIN_PASSWORD` | For the first start | 8 or more characters |
| `SUPERADMIN_NAME` | No | Default `Super Admin` |
| `SIGNUP_AUTO_APPROVE` | No | `true` lets new messes in without approval. Default `false` |
| `JWT_EXPIRES_IN` | No | How long a login lasts. Default `7d` |
| `PORT` | No | Local port. Default `5000` |

## Commands

| Command | Does |
|---|---|
| `npm run dev` | Starts the API and restarts it when files change |
| `npm start` | Starts the API |
| `npm run demo` | Starts the API on a temporary database with sample data |
| `npm run create-superadmin` | Creates the super admin, or resets its password, from `.env` |
| `npm test` | Runs the tests against a temporary database |
| `npm run lint` | Checks the code |

To reset a forgotten super admin password, change `SUPERADMIN_PASSWORD` in
`.env` (with `MONGODB_URI` pointing at that database) and run
`npm run create-superadmin`.

## API reference

All addresses start with `/api`. Bodies are JSON. Logged-in requests send
`Authorization: Bearer <token>`.

Errors look like this, with a matching HTTP status:

```json
{ "error": { "message": "Please enter member name.", "code": "OPTIONAL_CODE" } }
```

| Status | Meaning |
|---|---|
| 400 | The input is not valid |
| 401 | Not logged in, or the login has ended |
| 403 | Not allowed. Codes: `MESS_PENDING`, `MESS_SUSPENDED`, `ACCOUNT_DISABLED` |
| 404 | Not found, including records of another mess |
| 409 | Conflicts with existing records or a limit |
| 429 | Too many attempts |
| 503 | Not configured, or the database is not reachable |

### Anyone

| Method and path | Body | Result |
|---|---|---|
| `GET /health` | | `{ status }` |
| `POST /auth/register` | `messName, name, email, password, address?, phone?` | `{ token, user, mess }` |
| `POST /auth/login` | `email, password` | `{ token, user, mess }` |

### Any logged-in user

| Method and path | Body | Result |
|---|---|---|
| `GET /auth/me` | | `{ user, mess }` |
| `POST /auth/change-password` | `currentPassword, newPassword` | New `{ token, user, mess }`; older logins end |

### Mess admin and manager (active mess)

| Method and path | Body or query |
|---|---|
| `GET /members` | |
| `POST /members`, `PUT /members/:id` | `name, phone?, active?` |
| `DELETE /members/:id` | |
| `GET /deposits` | `?page=1&limit=50` |
| `POST /deposits`, `PUT /deposits/:id` | `memberId, date, amount` |
| `DELETE /deposits/:id` | |
| `GET /expenses` | `?page=1&limit=50` |
| `POST /expenses`, `PUT /expenses/:id` | `date, amount, description` |
| `DELETE /expenses/:id` | |
| `GET /meals/:date` | |
| `PUT /meals/:date` | `entries: [{ memberId, lunch, dinner }]` |
| `GET /reports/dashboard` | |
| `GET /reports/settlement` | `?from=&to=` |
| `GET /reports/monthly` | `?from=&to=` (at most 366 days) |

Dates are `YYYY-MM-DD`. Amounts are in taka with up to two decimals.

### Mess admin only

| Method and path | Body |
|---|---|
| `GET /team` | |
| `POST /team` | `name, email, password` |
| `PATCH /team/:userId` | `name?, active?, password?` |
| `DELETE /team/:userId` | |
| `PUT /mess` | `name, address?, phone?` |

### Super admin only

| Method and path | Body or query |
|---|---|
| `GET /platform/stats` | |
| `GET /platform/messes` | `?status=&search=&page=` |
| `POST /platform/messes` | `messName, name, email, password, address?, phone?, memberLimit?` |
| `GET /platform/messes/:messId` | |
| `PATCH /platform/messes/:messId` | `status?` (`active` or `suspended`), `memberLimit?` |
| `POST /platform/messes/:messId/users/:userId/password` | `password` |
| `DELETE /platform/messes/:messId` | `confirmName` |

## Code layout

| Path | Contents |
|---|---|
| `src/app.js` | The Express app and which roles reach which routes. Vercel's entry point |
| `src/local.js` | Starts the app as a normal server |
| `src/routes` | One file per area of the API |
| `src/middleware` | Login, roles, rate limits, database, errors |
| `src/models` | `Mess`, `User`, `Member`, `Deposit`, `Expense`, `MealDay`, `RateLimit` |
| `src/services` | Accounts, reports, platform tasks, tenant helpers |
| `src/lib` | Calculations, validation, dates, tokens, passwords |
| `scripts` | Demo and super admin commands |
| `tests` | Vitest and Supertest |

### Adding a route for mess data

Mount it behind `messOnly` in `src/app.js`, put `messId: req.mess._id` in every
query (use `findOwned` for single records), validate input with a schema, and
add a case to the tenant isolation test.

## Security

- Passwords are hashed with bcrypt. Tokens are signed with HS256.
- The user and mess are read on every request, so disabling an account,
  suspending a mess or changing a password takes effect at once.
- The `messId` always comes from the logged-in user, never from the request.
- Every input is validated, which also blocks MongoDB operator injection.
- Login, sign up and password changes are rate limited in the database, so the
  limits hold across serverless instances.
- The website keeps the token in `localStorage`. This works across two separate
  domains without third-party cookies. Its protection against script injection
  is React's escaping and the Content-Security-Policy in
  `../frontend/vercel.json`; keep both.

### Not included yet

Email verification, password reset by email, payments and subscription billing,
logins for mess members, and an audit log.
