/*! aofuji-analytics | DSRKafuU (https://dsrkafuu.su) | Copyright (c) MIT License */
require('../utils/env')();

const app = require('../src/api');
const serverless = require('serverless-http');

// normal
if (!process.env.SERVERLESS) {
  // static server in production
  if (process.env.NODE_ENV === 'production') {
    const { static: serveStatic } = require('express');
    const history = require('connect-history-api-fallback');
    app.use(history());
    app.use(serveStatic('dist'));
  }
  // port listening
  const port =
    process.env.NODE_ENV === 'production'
      ? process.env.SERVER_PORT || 3000
      : process.env.SERVER_API_PORT || 3001;
  app.listen(port, () => {
    console.log(`[aofuji] listening at http://localhost:${port}`);
  });
}

// serverless
// vercel
module.exports = app;
// aws lambda (netlify etc.)
module.exports.handler = serverless(app);
