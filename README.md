# isirmt Portfolio

- Next.js(Tailwind CSS)
- Go (WebSocket)
- PostgreSQL

## for dev

at root dir,

```bash
docker compose -f compose.dev.yml up -d backend web
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
