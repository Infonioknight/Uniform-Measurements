const express = require("express");
const filteredProductsRouter = express.Router(); // Correct variable name
const {protect}  = require("../middleware/authMiddleware.js");
const { getFilteredProductsbyMeasurements, getBrandSizechart } = require("../controllers/filteredPorductsController.js");

// Router for creating user measurement
filteredProductsRouter.get("/user/:userId/products/:sellerId", protect,  getFilteredProductsbyMeasurements);

filteredProductsRouter.get("/user/brand/sizechart/:sellerId/:brandName/:category",protect,getBrandSizechart)

module.exports = filteredProductsRouter;