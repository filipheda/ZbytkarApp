const Spiz = require('../models/spiz');
const { NotFoundError } = require('../utils/errors.js');

const getSpiz = async (req, res) => {
  const spiz = await Spiz.findOne({ userId: req.user.userId })
    .populate('ingredience.ingredienceId');
  
  res.json({ success: true, data: spiz });
};

const updateSpiz = async (req, res) => {
  const { ingredience } = req.body;
  
  const spiz = await Spiz.findOneAndUpdate(
    { userId: req.user.userId },
    { $set: { ingredience } },
    { new: true, upsert: true }
  );
  
  res.json({ success: true, data: spiz });
};

module.exports = {
  getSpiz,
  updateSpiz
};
