# LifeLink Backend

- Node.js Express + MongoDB (Mongoose)
- Auth: JWT bearer tokens

## Setup

1. Create a `.env` in Backend directory:
```
DATABASE_URL=mongodb://127.0.0.1:27017/lifelink
JWT_SECRET=supersecret-dev
PORT=4000
```
2. Install deps (already done):
```
npm install
```
3. Run:
```
npm run dev
```

## Scripts
- dev: start with nodemon
- start: node src/server.js
