const { Router } = require('express');
const { Symphony } = require('../models/Symphony');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const symphony = await Symphony.getById(id);
      res.json(symphony);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const symphonies = await Symphony.getAll();
      res.json(symphonies);
    } catch(e) {
      next(e);
    }
  });
