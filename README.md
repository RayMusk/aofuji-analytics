# Goose Analytics (Prototype)

Prototype of WIP Goose Analytics based on Vue.

## Environment Variables

### Development

In development mode, the website itself is provided by Vue CLI on `SERVER_PORT`.

Difference is that the API server is deployed on `API_SERVER_PORT` without static file provider, then proxyed by Vue CLI's webpack-dev-server to the same port as `SERVER_PORT`.

```
SERVER_PORT=3000
API_SERVER_PORT=3001
DATABASE_URL=mongodb://localhost:27017/goosedb_preview
```

### Production

Production mode needs `npm run build` first.

Both the API server and website files built are provided by express.js on `SERVER_PORT`.

```
SERVER_PORT=3000
DATABASE_URL=mongodb://localhost:27017/goosedb_preview
BASE_URL=/
```

## Development

First you need to fork this repo and clone it. Then:

```bash
npm install
npm run dev
```

## License

This project is released under `Apache License 2.0`, for more information read the [LICENSE](https://github.com/amzrk2/goose-analytics/blob/main/LICENSE).

**Copyright © 2020-present DSRKafuU <https://amzrk2.cc/>**
