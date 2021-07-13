const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      defalt: 0,
    },
    continent: {
      type: String,
    },
    images: {
      type: Array,
      default: [],
    },
    //몇개 팔렸는지
    sold: {
      type: Number,
      maxlength: 100,
      default: 0,
    },
    vies: {
      type: Number,
      defalt: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };