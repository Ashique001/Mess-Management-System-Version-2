# Deploy with MongoDB Atlas and Vercel (free plans)

You will create one database and two Vercel projects from the same GitHub
repository:

```
Browser ──▶ Website (Vercel project, folder "frontend")
              │  VITE_API_URL
              ▼
            API (Vercel project, folder "backend")
              │  MONGODB_URI
              ▼
            MongoDB Atlas
```

Before you start, merge the work into the branch that Vercel will deploy
(usually `main`).

## 1. Database: MongoDB Atlas

1. Sign up at <https://www.mongodb.com/atlas> and create a **free (M0)**
   cluster. Pick a region near your users, for example Singapore or Mumbai for
   Bangladesh.
2. **Database Access** → add a database user with a long generated password and
   the role "Read and write to any database".
3. **Network Access** → add `0.0.0.0/0`. Vercel has no fixed IP addresses, so
   the database user's password is what protects the data. Make it strong.
4. **Connect** → **Drivers** → copy the connection string. Put your password in
   it and a database name before the `?`:

   ```
   mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/mess_meal?retryWrites=true&w=majority
   ```

   If the password contains characters such as `@ : / ? #`, encode them
   (`@` becomes `%40`), or generate a password with letters and numbers only.

### Try it on your computer first

In `backend/.env`, fill in `MONGODB_URI`, `JWT_SECRET`, `SUPERADMIN_EMAIL` and
`SUPERADMIN_PASSWORD`. Then:

```sh
cd backend && npm run dev          # terminal 1
cd frontend && npm run dev         # terminal 2
```

Open <http://localhost:5173> and log in as the super admin.

## 2. API: first Vercel project

1. At <https://vercel.com>, **Add New → Project** and import the repository.
2. **Root Directory**: `backend`. Vercel recognises the Express app; leave the
   build settings empty.
3. Add these **Environment Variables** for Production:

   | Name | Value |
   |---|---|
   | `MONGODB_URI` | The Atlas connection string |
   | `JWT_SECRET` | Output of `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
   | `SUPERADMIN_EMAIL` | Your email. Not needed if the database already has a super admin |
   | `SUPERADMIN_PASSWORD` | A strong password. Same condition |
   | `CORS_ORIGIN` | Leave for step 4 |

4. **Deploy**. Then open `https://YOUR-API.vercel.app/api/health`. It should
   show `{"status":"ok"}`.
5. The functions run in the region named in `backend/vercel.json`: `bom1`
   (Mumbai). Keep it next to your database. If the database is elsewhere,
   change it to the closest
   [Vercel region](https://vercel.com/docs/regions).

## 3. Website: second Vercel project

1. **Add New → Project**, import the same repository again.
2. **Root Directory**: `frontend`. Framework preset: **Vite**.
3. The API address comes from `frontend/.env.production`. Change it there if
   your API has another address (no `/api`, no trailing slash). A
   `VITE_API_URL` variable in this Vercel project overrides the file.
4. **Deploy**.

## 4. Connect the two

1. In the **API** project, set `CORS_ORIGIN` to the website address, for example
   `https://your-site.vercel.app`.
2. **Redeploy** the API project. Changed variables apply only to new
   deployments.
3. Open the website and log in as the super admin.

## 5. Check it

- [ ] Register a test mess in a private window: it shows "Waiting for approval".
- [ ] Approve it as super admin: the test mess can open the app.
- [ ] Add a member, a deposit, an expense and a day of meals.
- [ ] Delete the test mess.
- [ ] After the first login works, you may remove `SUPERADMIN_PASSWORD` from
      Vercel. The account stays in the database.

## Your own domain

Add it to the website project under **Settings → Domains**, add the new address
to `CORS_ORIGIN`, and redeploy the API. If the API also gets its own domain,
update `VITE_API_URL` (in `frontend/.env.production` or on Vercel) and redeploy
the website.

## Troubleshooting

| Problem | Check |
|---|---|
| "The server is not configured yet." | `MONGODB_URI` and `JWT_SECRET` (32+ characters) on the API project; redeploy. The function log names the missing one. |
| "The database is not reachable." | Atlas Network Access includes `0.0.0.0/0`; user, password and encoding in the connection string |
| "Cannot reach the server" on the website | `VITE_API_URL` is correct, `CORS_ORIGIN` matches the website address exactly, both redeployed |
| "The server gave an unexpected answer" | `VITE_API_URL` is missing or points at the website instead of the API |
| `querySrv ECONNREFUSED` on your computer | Node cannot do the DNS lookup for `mongodb+srv://`. In `backend/.env` use the standard `mongodb://` string that lists the cluster's servers. Vercel is not affected. |
| Super admin login fails | The log of the API project says "Super admin created" or why not. Or run `npm run create-superadmin` on your computer with the same `MONGODB_URI`. |
| Preview deployments cannot reach the API | Their address differs; add it to `CORS_ORIGIN` or test on the production address |
| First request is slow | Free hosting starts the function and database connection on demand |

## Limits of the free plans

Check the current terms before relying on them.

- **Vercel Hobby** is meant for personal, non-commercial use. When you charge
  messes for the service, move to a paid plan.
- **Atlas M0** has 512 MB of storage and no automatic backups. A 20-member mess
  needs roughly 2 MB a year (an estimate). Back up regularly with
  [`mongodump`](https://www.mongodb.com/docs/database-tools/mongodump/):

  ```sh
  mongodump --uri "YOUR_CONNECTION_STRING" --out backup-folder
  ```
