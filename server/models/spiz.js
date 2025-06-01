const mongoose = require('mongoose');
const { Schema } = mongoose;

const spizSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  ingredience: [{
    ingredienceId: {
      type: Schema.Types.ObjectId,
      ref: 'ingredience',
      required: true
    },
    mnozstvi: {
      type: Number,
      required: true,
      min: 0
    },
    jednotka: {
      type: String,
      required: true,
      enum: ['g', 'kg', 'ml', 'l', 'ks']
    },
    datumExpirace: {
      type: Date,
      index: true
    }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index pro rychle vyhledavaani #TODO
spizSchema.index({ 'ingredience.ingredienceId': 1 });
spizSchema.index({ 'ingredience.datumExpirace': 1 });

// #datumExpirace pokud budeme delat
spizSchema.virtual('expirovane').get(function() {
  return this.ingredience.filter(i => i.datumExpirace < new Date());
});

module.exports = mongoose.model('SpizUzivatele', spizSchema);
