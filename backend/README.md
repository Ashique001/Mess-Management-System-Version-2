# Mess Meal Management — API

Express and MongoDB server for the React app in `../frontend`.

## Run

Needs Node.js 22.12 or newer.

```sh
npm install
cp .env.example .env   # then fill in MONGODB_URI and JWT_SECRET
npm run dev            # http://localhost:5000/api/health
npm test               # downloads a test MongoDB on the first run
npm run lint
```
