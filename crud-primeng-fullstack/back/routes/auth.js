const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { findUserByUsername, createUser } = require("../models/userModel");

const router = express.Router();

/* ============================
   ROTA DE REGISTRO
=============================== */
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  findUserByUsername(username, async (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Erro no banco de dados' });
    }
    if (user) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // 🔥 Criptografar senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    createUser(username, hashedPassword, (err, newUser) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao criar usuário' });
      }
      res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
    });
  });
});


/* ============================
   ROTA DE LOGIN
=============================== */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 🔥 LOG 1 — ver o que está chegando no backend
  console.log(">>> Login recebido:", username, password);

  findUserByUsername(username, async (err, user) => {

    // 🔥 LOG 2 — ver o que o banco está retornando
    console.log(">>> Usuário encontrado:", user);

    if (err) return res.status(500).json({ error: "Erro no banco de dados" });
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    // 🔥 LOG 3 — ver exatamente o que está sendo comparado
    console.log(">>> Comparando senha:", password, "COM", user.password);

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      console.log(">>> Resultado bcrypt: SENHA INCORRETA");
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    console.log(">>> Login OK! Token gerado.");
    return res.json({ message: "Login bem-sucedido", token });
  });
});



module.exports = router;


// [SAMUEL KALAIN]