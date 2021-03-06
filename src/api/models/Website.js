const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _date: { type: Number, default: Date.now },
  _account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },

  name: { type: String },
  url: { type: String },
  base: { type: String }, // base of website ('' or starts with '/')
});

schema.index({ _date: -1 });
schema.index({ _account: 1 });

module.exports = mongoose.model('Website', schema);
