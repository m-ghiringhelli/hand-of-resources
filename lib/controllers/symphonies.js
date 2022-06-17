const { Router } = require('express');
const { Symphony } = require('../models/Symphony');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const symphonies = await Symphony.getAll();
      res.json(symphonies);
    } catch(e) {
      next(e);
    }
  });
