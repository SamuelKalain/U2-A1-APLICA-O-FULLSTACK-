// productModel.js - [Samuel Kalain]

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  preco: { type: Number, required: true },
  categoria: { 
    type: String, 
    enum: ["pizza", "bebida", "sobremesa"], 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
