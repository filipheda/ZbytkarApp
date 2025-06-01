const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

// Kontrolery pro ingredience (zatim empty TBD)
const getIngredienceController = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Seznam ingrediencí',
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Chyba při načítání ingrediencí',
      error: error.message
    });
  }
};

const createIngredienceController = async (req, res) => {
  try {
    res.status(201).json({
      success: true,
      message: 'Ingredience vytvořena'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Chyba při vytváření ingredience',
      error: error.message
    });
  }
};

// rroutes
router.get('/', getIngredienceController);
router.post('/', createIngredienceController);

module.exports = router; // ✅ DŮLEŽITÉ - Export routeru
