const ProductModel = require("../models/product.model");
const UserModel = require("../models/user.model");

const createProduct = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const { productName, description, price, category, sizes, colors, images } =
      req.body;

    if (
      !productName ||
      !description ||
      !price ||
      !category ||
      !sizes ||
      !colors
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!Array.isArray(colors) || colors.length === 0) {
      return res.status(400).json({ message: "Colors required" });
    }

    if (!Array.isArray(sizes) || sizes.length === 0) {
      return res.status(400).json({ message: "Sizes required" });
    }

    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: "Images required" });
    }

    const newProduct = await ProductModel.create({
      productName,
      description,
      price,
      category,
      sizes,
      colors,
      images,
      userID: userId,
    });

    let currentUser = await UserModel.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    currentUser.products = currentUser.products || [];
    currentUser.products.push(newProduct._id);
    await currentUser.save();

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error in create product:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const findProduct = async (req, res) => {
  try {
    const products = await ProductModel.find()


    return res.status(200).json({
      message:"all products are fetched",
      products,
    });
  } catch (error) {
    console.error("Error in findProduct:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { createProduct , findProduct };
