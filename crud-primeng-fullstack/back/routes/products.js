// products.js - CRUD de Produtos (Pizzaria)
// [Samuel Kalain]

const express = require("express");
const router = express.Router();
const Products = require("../models/productModel.js");
const auth = require("../middleware/auth");

// Criar produto
router.post("/", auth, async (req, res) => {
  try {
    const data = await Product.create(req.body);
    res.status(201).json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Listar todos
router.get("/", auth, async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

// Buscar por ID
router.get("/:id", auth, async (req, res) => {
  const data = await Product.findById(req.params.id);
  res.json(data);
});

// Atualizar
router.put("/:id", auth, async (req, res) => {
  const data = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
});

// Deletar
router.delete("/:id", auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Produto removido com sucesso." });
});

module.exports = router;
