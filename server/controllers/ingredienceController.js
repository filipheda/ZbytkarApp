const Ingredience = require('../models/ingredience');
const { NotFoundError, BadRequestError } = require('../utils/errors.js');

const getAllIngredience = async (req, res) => {
  const { kategorie } = req.query;
  const filter = kategorie ? { kategorie } : {};
  
  const ingredience = await Ingredience.find(filter);
  res.json({ success: true, count: ingredience.length, data: ingredience });
};

const createIngredience = async (req, res) => {
  if (!req.body.nazev || !req.body.kategorie) {
    throw new BadRequestError('Chybí povinná pole: nazev a kategorie');
  }
  
  const novaIngredience = await Ingredience.create(req.body);
  res.status(201).json({ success: true, data: novaIngredience });
};

const updateIngredience = async (req, res) => {
  const { id } = req.params;
  
  const ingredience = await Ingredience.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true }
  );
  
  if (!ingredience) {
    throw new NotFoundError(`Ingredience s ID ${id} nenalezena`);
  }
  
  res.json({ success: true, data: ingredience });
};

module.exports = {
  getAllIngredience,
  createIngredience,
  updateIngredience
};
