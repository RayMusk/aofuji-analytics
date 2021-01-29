/* utils */
const { Router } = require('express');
const router = Router();
const { Account } = require('../../utils/mongoose.js');

const selectKeys = 'username isAdmin';

// get account
router.get('/', async (req, res) => {
  const result = await Account.findOne({}).select(selectKeys).lean();
  res.send(result);
});

// modify account
router.put('/:id', async (req, res) => {
  const { username, password } = req.body;
  const result = await Account.findByIdAndUpdate(req.params.id, {
    username,
    password,
    isAdmin: true,
    _date: Date.now(),
  })
    .select(selectKeys)
    .lean();
  res.status(201).send(result);
});

module.exports = { router };
