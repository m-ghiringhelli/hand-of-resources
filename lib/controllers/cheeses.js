const { Router } = require('express');
const { Cheese } = require('../models/Cheese');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const cheeses = await Cheese.getAll();
      res.json(cheeses);
    } catch (e) {
      next(e);
    }
  });
