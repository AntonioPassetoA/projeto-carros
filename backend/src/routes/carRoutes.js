
const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const CarModel = require('../models/CarModel');
const cache = require('../config/cache');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'segredo';

function auth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token ausente' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = user;
        next();
    });
}

router.get('/cars', auth, async (req, res) => {
    const cached = cache.get('cars');
    if (cached) return res.json(cached);
    try {
        const cars = await CarModel.getAll();
        cache.set('cars', cars);
        res.json(cars);
    } catch {
        res.status(500).json({ error: 'Erro ao buscar carros' });
    }
});

router.post('/cars', auth, [
    body('marca').isString().notEmpty(),
    body('modelo').isString().notEmpty(),
    body('ano').isInt({ min: 1900, max: 2100 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: 'Dados inválidos' });

    try {
        await CarModel.insert(req.body);
        cache.del('cars');
        res.status(201).json({ message: 'Carro inserido com sucesso' });
    } catch {
        res.status(500).json({ error: 'Erro ao inserir carro' });
    }
});

module.exports = router;
