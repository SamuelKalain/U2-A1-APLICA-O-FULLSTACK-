const db = require('../db/database');

// Criar pedido
function createOrder(cliente, items, total, callback) {
    db.run(
        `INSERT INTO orders (cliente, items, total) VALUES (?, ?, ?)`,
        [cliente, JSON.stringify(items), total],
        function (err) {
            callback(err, { id: this?.lastID, cliente, items, total });
        }
    );
}

// Listar todos os pedidos
function getAllOrders(callback) {
    db.all(`SELECT * FROM orders`, [], callback);
}

// Buscar pedido por id
function getOrderById(id, callback) {
    db.get(`SELECT * FROM orders WHERE id = ?`, [id], callback);
}

// Atualizar pedido
function updateOrder(id, cliente, items, total, callback) {
    db.run(
        `UPDATE orders SET cliente = ?, items = ?, total = ? WHERE id = ?`,
        [cliente, JSON.stringify(items), total, id],
        function (err) {
            callback(err);
        }
    );
}

// Remover
function deleteOrder(id, callback) {
    db.run(`DELETE FROM orders WHERE id = ?`, [id], callback);
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};
