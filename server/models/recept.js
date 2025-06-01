const mongoose = require('mongoose');

const receptSchema = new mongoose.Schema({
  receptId: {
    type: String,
    required: true,
    unique: true
  },
  nazev: {
    type: String,
    required: true,
    maxlength: 200
  },
  popis: {
    type: String,
    maxlength: 500
  },
  dobaVypravy: {
    type: Number, // v minutách
    required: true,
    min: 1
  },
  obtiznost: {
    type: String,
    enum: ['Snadná', 'Střední', 'Těžká'],
    required: true
  },
  kroky: [{
    poradi: Number,
    popis: String,
    potrebneCasovani: Number, // v minutách
    ingredience: [{
      ingredienceId: String,
      mnozstvi: Number,
      jednotka: String
    }]
  }],
  potrebneIngredienty: [{
    ingredienceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredience',
      required: true
    },
    mnozstvi: {
      type: Number,
      required: true
    },
    jednotka: {
      type: String,
      required: true
    }
  }],
  volitelneIngredienty: [{
    ingredienceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredience'
    },
    mnozstvi: Number,
    jednotka: String
  }],
  tagy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  obrazekUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i.test(v);
      },
      message: 'Neplatná URL obrázku'
    }
  }
}, {
  timestamps: true
});

// Index pro rychle vyhledavaani #TODO
receptSchema.index({ tagy: 1 });
receptSchema.index({ potrebneIngredienty: 1 });
receptSchema.index({ nazev: 'text', popis: 'text' });

module.exports = mongoose.model('Recept', receptSchema);
