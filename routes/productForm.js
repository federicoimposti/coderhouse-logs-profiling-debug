const express = require('express');
const logger = require('../logs/logger');
const productFormRouter = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/User'); 

productFormRouter.get("/", auth, async (req, res) => {
  const { username } = await User.findById(req.user._id);
  res.render("pages/productForm", {
    user: username,
  });
  logger.info(`la ${new Date().toLocaleString()}`);
});

module.exports = productFormRouter;