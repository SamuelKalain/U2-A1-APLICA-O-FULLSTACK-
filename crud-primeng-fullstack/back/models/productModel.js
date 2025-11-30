const db = require('../db/database');

function createProduct(nome, descricao, preco, categoria, callback) {
    const query = `
        INSERT INTO products (nome, descricao, preco, categoria)
        VALUES (?, ?, ?, ?)
    `;
    db.run(query, [nome, descricao, preco, categoria], function(err) {
        if (err) return callback(err);
        callback(null, { id: this.lastID, nome, descricao, preco, categoria });
    });
}

function getAllProducts(callback) {
    db.all("SELECT * FROM products", [], callback);
}

function getProductById(id, callback) {
    db.get("SELECT * FROM products WHERE id = ?", [id], callback);
}

function updateProduct(id, nome, descricao, preco, categoria, callback) {
    const query = `
        UPDATE products
        SET nome = ?, descricao = ?, preco = ?, categoria = ?
        WHERE id = ?
    `;
    db.run(query, [nome, descricao, preco, categoria, id], callback);
}

function deleteProduct(id, callback) {
    db.run("DELETE FROM products WHERE id = ?", [id], callback);
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
