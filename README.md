# Goose Analytics (Prototype)

Prototype of WIP Goose Analytics based on Vue.

## About Vue.js

Vue.js is in the transition phase from v2 to v3, and the project will continue to be based on v2 temporarily because the adaptation of the community ecosystem of v3 and its Composition API is not stable yet.

Options API prop order:

```
name => components => props => data => computed => watch => methods => lifecycle functions
```

## Local Development

First you need to fork this repo and clone it. Then create a `.env.development` then set the development environment variables below.

After these, you can simply:

```bash
npm install
npm run dev
```

Check the [Environment Variables](#environment-variables) section for more details.

## Environment Variables

### Development

In development mode, the website itself is provided by Vue CLI on `SERVER_PORT`.

Difference is that the API server is deployed on `SERVER_API_PORT` without static file provider, then proxyed by Vue CLI's webpack-dev-server to the same port as `SERVER_PORT`.

```
SERVER_PORT=3000
DATABASE_URL="mongodb://localhost:27017/goosedb_preview"
VUE_APP_TITLE="Goose Analytics (Prototype)"

SERVER_API_PORT=3001
```

### Production

Production mode needs `npm run build` first.

Both the API server and website files built are provided by express.js on `SERVER_PORT`.

Use `HELMET=1` to enable Helmet for server.

```
SERVER_PORT=3000
DATABASE_URL="mongodb://localhost:27017/goosedb_preview"
VUE_APP_TITLE="Goose Analytics (Prototype)"

BASE_URL="/"
HELMET=1
```

## License

This project is released under `Apache License 2.0`, for more information read the [LICENSE](https://github.com/amzrk2/goose-analytics/blob/main/LICENSE).

**Copyright © 2020-present DSRKafuU <https://amzrk2.cc/>**
