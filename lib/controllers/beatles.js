const { Router } = require('express');
const { Beatle } = require('../models/Beatle');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      console.log('controller', id);
      const beatle = await Beatle.getById(id);
      console.log('beatle', beatle);
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
  });
