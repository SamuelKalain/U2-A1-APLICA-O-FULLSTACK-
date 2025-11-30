const express = require('express');
const router = express.Router();
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} = require('../models/orderModel');

// Criar pedido
router.post('/', (req, res) => {
    const { cliente, items, total } = req.body;

    createOrder(cliente, items, total, (err, pedido) => {
        if (err) return res.status(500).json({ error: 'Erro ao criar pedido' });
        res.status(201).json(pedido);
    });
});

// Listar pedidos
router.get('/', (req, res) => {
    getAllOrders((err, pedidos) => {
        if (err) return res.status(500).json({ error: 'Erro ao listar pedidos' });
        res.json(pedidos);
    });
});

// Buscar pedido
router.get('/:id', (req, res) => {
    getOrderById(req.params.id, (err, pedido) => {
        if (err) return res.status(500).json({ error: 'Erro ao buscar pedido' });
        res.json(pedido);
    });
});

// Atualizar pedido
router.put('/:id', (req, res) => {
    const { cliente, items, total } = req.body;

    updateOrder(req.params.id, cliente, items, total, (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao atualizar pedido' });
        res.json({ message: 'Pedido atualizado com sucesso' });
    });
});

// Deletar pedido
router.delete('/:id', (req, res) => {
    deleteOrder(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao excluir pedido' });
        res.json({ message: 'Pedido removido com sucesso' });
    });
});

module.exports = router;
