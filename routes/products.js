const express = require('express');
const productsRouter = express.Router();

const controller = require('../controllers/products');

productsRouter.get("/", async (req, res) => {
  console.log('aca llega');
  const response = await controller.getAll();
  console.log('aca no')
  res.render('pages/productsList', { products: response });
});

productsRouter.post("/", (req, res) => {
  controller.save(req.body);
  res.redirect("/");
});

module.exports = productsRouter;