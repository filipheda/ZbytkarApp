const mongoose = require('mongoose');

const ingredienceSchema = new mongoose.Schema({
  ingredienceId: {
    type: String,
    required: true,
    unique: true
  },
  nazev: {
    type: String,
    required: true,
    maxlength: 100
  },
  kategorie: {
    type: String,
    enum: ['zelenina', 'maso', 'mléčné výrobky', 'obiloviny', 'koření', 'ovoce', 'luštěniny', 'oleje', 'ostatní'],
    required: true
  },
  jednotkaMnozstvi: {
    type: String,
    enum: ['gram', 'kilogram', 'litr', 'mililitr', 'kus', 'lžíce', 'lžička', 'šálek'],
    required: true
  },
  trvanlivost: {
    type: Number, // dny
    min: 1
  },
  nutricniInformace: {
    kalorie: Number, // na 100g/100ml
    bílkoviny: Number,
    tuky: Number,
    sacharidy: Number
  },
  alternativniIngredienty: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredience'
  }]
}, {
  timestamps: true
});

ingredienceSchema.index({ kategorie: 1 });
ingredienceSchema.index({ nazev: 'text' });

module.exports = mongoose.model('Ingredience', ingredienceSchema);
