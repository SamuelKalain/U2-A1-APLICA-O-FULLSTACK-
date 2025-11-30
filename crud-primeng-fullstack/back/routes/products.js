// products.js - CRUD de Produtos (Pizzaria)
// [Samuel Kalain]

const express = require("express");
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../models/productModel");

// Criar produto
router.post("/", (req, res) => {
    const { nome, descricao, preco, categoria } = req.body;

    if (!nome || !preco || !categoria) {
        return res.status(400).json({ error: "Campos obrigatórios: nome, preco, categoria" });
    }

    createProduct(nome, descricao, preco, categoria, (err, product) => {
        if (err) return res.status(500).json({ error: "Erro ao criar produto" });
        res.status(201).json(product);
    });
});

// Listar
router.get("/", (req, res) => {
    getAllProducts((err, products) => {
        if (err) return res.status(500).json({ error: "Erro ao listar produtos" });
        res.json(products);
    });
});

// Buscar 1
router.get("/:id", (req, res) => {
    getProductById(req.params.id, (err, product) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar produto" });
        res.json(product);
    });
});

// Atualizar
router.put("/:id", (req, res) => {
    const { nome, descricao, preco, categoria } = req.body;

    updateProduct(req.params.id, nome, descricao, preco, categoria, (err) => {
        if (err) return res.status(500).json({ error: "Erro ao atualizar produto" });
        res.json({ message: "Produto atualizado com sucesso" });
    });
});

// Deletar
router.delete("/:id", (req, res) => {
    deleteProduct(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: "Erro ao deletar produto" });
        res.json({ message: "Produto removido com sucesso" });
    });
});

module.exports = router;
