/* utils */
const { Router } = require('express');
const router = Router();
const buildError = require('./utils/buildError.js');
const { mongoose } = require('./utils/mongoose.js');
router.use(mongoose());

/* routes */
// collect route
require('./routes/collect.js')(router);
// user
require('./routes/user.js')(router);
// website
require('./routes/website.js')(router);
// debug
require('./routes/debug.js')(router);

/* fallback */
router.get('/*', async () => {
  throw buildError(404, 'route not found');
});
router.use(require('./middlewares/errorHandler.js')());

module.exports = router;
