let mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["MENS", "WOMENS", "KIDS"],
      default: "KIDS",
    },
    sizes: [
      {
        type: String,
        enum: ["S", "XS", "M", "XL", "XXL", "L"],
        default: "L",
      },
    ],
    colors: [
      {
        type: String,
        required: true,
      },
    ],
    images: [
      {
        type: String,
        required: true,
      },
    ],
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;
