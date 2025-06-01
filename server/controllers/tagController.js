const Tag = require('../models/tag');
const { BadRequestError, NotFoundError } = require('../utils/errors.js');

const getAllTagy = async (req, res) => {
  const tagy = await Tag.find({});
  res.json({ success: true, count: tagy.length, data: tagy });
};

const createTag = async (req, res) => {
  if (!req.body.nazev || !req.body.typ) {
    throw new BadRequestError('Chybí povinná pole: nazev a typ');
  }
  
  const novyTag = await Tag.create(req.body);
  res.status(201).json({ success: true, data: novyTag });
};

const deleteTag = async (req, res) => {
  const { id } = req.params;
  
  const tag = await Tag.findByIdAndDelete(id);
  if (!tag) {
    throw new NotFoundError(`Tag s ID ${id} nenalezen`);
  }
  
  res.json({ success: true, data: {} });
};

module.exports = {
  getAllTagy,
  createTag,
  deleteTag
};
