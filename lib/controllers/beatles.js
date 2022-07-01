const { Router } = require('express');
const { Beatle } = require('../models/Beatle');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const beatle = await Beatle.getById(id);
      res.json(beatle);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const beatle = await Beatle.updateById(id, req.body);
      res.json(beatle); 
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const beatles = await Beatle.getAll();
      res.json(beatles);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const beatle = await Beatle.insert(req.body);
      res.json(beatle);
    } catch (e) {
      next(e);
    }
  });

