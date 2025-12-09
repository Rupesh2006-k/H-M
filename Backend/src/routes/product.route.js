const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/products.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/create", authMiddleware, ProductController.createProduct);
router.post("/find", authMiddleware, ProductController.findProduct);

module.exports = router;
