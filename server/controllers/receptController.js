const Recept = require('../models/recept');
const receptService = require('../services/receptService');
const recommendationService = require('../services/recommendationService');
const { validationResult } = require('express-validator');

// Ziskani vsech receptu s filtraci
const getRecepty = async (req, res) => {
  try {
    const { tagy, obtiznost, dobaVypravy, search } = req.query;
    let filter = {};

    if (tagy) {
      filter.tagy = { $in: tagy.split(',') };
    }
    if (obtiznost) {
      filter.obtiznost = obtiznost;
    }
    if (dobaVypravy) {
      filter.dobaVypravy = { $lte: parseInt(dobaVypravy) };
    }
    if (search) {
      filter.$text = { $search: search };
    }

    const recepty = await Recept.find(filter)
      .populate('potrebneIngredienty.ingredienceId')
      .populate('volitelneIngredienty.ingredienceId')
      .populate('tagy')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: recepty.length,
      data: recepty
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Chyba při načítání receptů',
      error: error.message
    });
  }
};

// Generovani receptu podle dostupnych ingredienci
const generateRecepty = async (req, res) => {
  try {
    const { dostupneIngredienty } = req.body;
    
    if (!dostupneIngredienty || !Array.isArray(dostupneIngredienty)) {
      return res.status(400).json({
        success: false,
        message: 'Chybí seznam dostupných ingrediencí'
      });
    }

    const doporuceneRecepty = await recommendationService.generateReceptyProIngredienty(dostupneIngredienty);

    res.json({
      success: true,
      data: doporuceneRecepty
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Chyba při generování receptů',
      error: error.message
    });
  }
};

// Vytvoreni noveho receptu
const createRecept = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Chyby validace',
        errors: errors.array()
      });
    }

    const recept = new Recept(req.body);
    await recept.save();

    res.status(201).json({
      success: true,
      data: recept
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Chyba při vytváření receptu',
      error: error.message
    });
  }
};

module.exports = {
  getRecepty,
  generateRecepty,
  createRecept
};
