const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/products.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/create", authMiddleware, ProductController.createProduct);
router.post("/find", authMiddleware, ProductController.findProduct);
router.get("/one-product/:id", ProductController.findSingleProduct);
router.delete("/delete/:id", ProductController.deleteProduct);
router.put("/update/:id", ProductController.updateProduct);

module.exports = router;
