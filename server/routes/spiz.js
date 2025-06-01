const express = require('express');
const router = express.Router();

const getSpizController = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Obsah spíže',
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Chyba při načítání spíže',
      error: error.message
    });
  }
};

const updateSpizController = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Spíž aktualizována'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Chyba při aktualizaci spíže',
      error: error.message
    });
  }
};

router.get('/', getSpizController);
router.put('/', updateSpizController);

module.exports = router; // !!!DŮLEŽITÉ!!! - Export routeru
