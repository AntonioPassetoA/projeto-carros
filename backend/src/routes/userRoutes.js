
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const UserModel = require('../models/UserModel');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'segredo';

router.post('/login', [
    body('username').isString().notEmpty(),
    body('password').isString().notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: 'Dados inválidos' });

    const { username, password } = req.body;
    try {
        const user = await UserModel.findByUsername(username);
        if (!user) return res.status(401).json({ error: 'Usuário ou senha inválidos' });
        const same = await bcrypt.compare(password, user.password);
        if (!same) return res.status(401).json({ error: 'Usuário ou senha inválidos' });
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

module.exports = router;
