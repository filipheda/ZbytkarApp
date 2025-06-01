const express = require('express');
const router = express.Router();

const getTagyController = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Seznam tagů',
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Chyba při načítání tagů',
      error: error.message
    });
  }
};

const createTagController = async (req, res) => {
  try {
    res.status(201).json({
      success: true,
      message: 'Tag vytvořen'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Chyba při vytváření tagu',
      error: error.message
    });
  }
};

router.get('/', getTagyController);
router.post('/', createTagController);

module.exports = router; //  !!!DŮLEŽITÉ!!! - Export routeru
