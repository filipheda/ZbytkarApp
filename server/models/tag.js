const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  tagId: {
    type: String,
    required: true,
    unique: true
  },
  nazev: {
    type: String,
    required: true,
    maxlength: 50
  },
  typ: {
    type: String,
    enum: ['typ jídla', 'dietní omezení', 'doba přípravy', 'obtížnost', 'kuchyně'],
    required: true
  },
  popis: {
    type: String,
    maxlength: 200
  }
}, {
  timestamps: true
});

tagSchema.index({ typ: 1 });

module.exports = mongoose.model('Tag', tagSchema);
