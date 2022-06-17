const { Router } = require('express');
const { Symphony } = require('../models/Symphony');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const symphony = await Symphony.insert(req.body);
      res.json(symphony);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const symphony = await Symphony.updateById(id, req.body);
      res.json(symphony);
    } catch (e) {
      next(e);
    }
  })
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
