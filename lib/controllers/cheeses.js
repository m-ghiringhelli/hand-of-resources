const { Router } = require('express');
const { Cheese } = require('../models/Cheese');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      console.log('controller', id);
      const cheese = await Cheese.delete(id);
      console.log('cheese', cheese);
      res.json(cheese);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const cheese = await Cheese.insert(req.body);
      res.json(cheese);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const cheese = await Cheese.updateById(id, req.body);
      res.json(cheese);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const cheese = await Cheese.getById(id);
      res.json(cheese);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const cheeses = await Cheese.getAll();
      res.json(cheeses);
    } catch (e) {
      next(e);
    }
  });
