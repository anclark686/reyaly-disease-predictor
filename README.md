# Reyaly Disease Predictor Frontend

This frontend is a Bun + React single-page app that is served by a small Bun
server in `src/index.ts`.

## Local development

Install dependencies:

```bash
bun install
```

Start the development server:

```bash
bun dev
```

Run the production server locally:

```bash
bun start
```

## Environment variables

Local development uses `http://localhost:8000` by default through
`frontend/.env.development`.

Create a `.env.local` file if you want to override the backend API URL during
development:

```bash
BUN_PUBLIC_API_BASE_URL=http://localhost:8000
```

For production, set `BUN_PUBLIC_API_BASE_URL` to your deployed backend URL.

## Heroku deployment notes

- The app must run as a web process and bind to Heroku's assigned `PORT`.
- `Procfile` is included for Heroku.
- Set `BUN_PUBLIC_API_BASE_URL` in Heroku config vars to your backend URL.
