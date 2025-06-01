const express = require('express');
const { body } = require('express-validator');
const {
  getRecepty,
  generateRecepty,
  createRecept
} = require('../controllers/receptController');

const router = express.Router();

// Validace pro vytvoreni receptu
const validateRecept = [
  body('nazev').notEmpty().withMessage('Název je povinný'),
  body('dobaVypravy').isInt({ min: 1 }).withMessage('Doba přípravy musí být kladné číslo'),
  body('obtiznost').isIn(['Snadná', 'Střední', 'Těžká']).withMessage('Neplatná obtížnost')
];

// GET /api/recepty - vsechny recepty + filtr
router.get('/', getRecepty);

// POST /api/recepty/generate generovani ze spajzu
router.post('/generate', generateRecepty);

// POST /api/recepty - vytvoreni new receptu
router.post('/', validateRecept, createRecept);

module.exports = router;
