# isirmt Portfolio

- Next.js(Tailwind CSS)
- Go (WebSocket)
- PostgreSQL

## requirements

- Docker, Docker Compose

## for dev

at root dir,

```bash
docker compose -f compose.dev.yml up -d backend web
```

you'll be able to access at `http://localhost:3000`.

if you want checking logs... (realtime)

```bash
docker compose -f compose.dev.yml logs --follow backend web
```

if you modified golang packages, run this

```bash
docker compose -f compose.dev.yml run --rm backend bash -c "go mod tidy"
```

## for prod

at root dir,

```bash
docker compose -f compose.yml up -d backend web
```
