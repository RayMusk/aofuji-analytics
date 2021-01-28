/* deps */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* utils */
const { buildError } = require('../utils/buildError.js');
const { Account, select } = require('../utils/mongoose.js');

const selectKeys = 'username';

module.exports = (router) => {
  // check init status
  router.get('/init', async (req, res) => {
    const inited = await Account.findOne({}).select(selectKeys).lean();
    res.set('Content-Length', 0);
    if (!inited) {
      res.status(201).send();
    }
    res.send();
  });

  // init admin
  router.post('/init', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      throw buildError(400, 'init request unknown body');
    }
    let result = await Account.create({
      username,
      password,
      isAdmin: true,
    });
    res.status(201).send(select(result, selectKeys));
  });

  // login route
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      throw buildError(400, 'login request unknown body');
    }

    // find user
    const account = await Account.findOne({ username }).select('+password').lean();
    if (!account) {
      throw buildError(403, 'wrong username or password');
    }

    // parallelly check password and gen token
    const checkPassword = async () => {
      const valid = bcrypt.compareSync(password, account.password);
      if (!valid) {
        throw buildError(403, 'wrong username or password');
      }
    };
    const genToken = async () => {
      const secret = process.env.TOKEN_SECRET || 'goose_token-secret';
      const token = jwt.sign({ _id: account._id, username: account.username }, secret, {
        algorithm: 'HS256',
      });
      if (!token) {
        throw buildError(500, 'error generating jwt token');
      }
      return token;
    };
    const [, token] = await Promise.all([checkPassword(), genToken()]);

    // send token back
    res.cookie('goose_token', token, { maxAge: 14 * 86400 * 1000, sameSite: 'Lax' });
    res.send(select(account, selectKeys));
  });
};