const { Router } =  require('express');
const { Borough } = require('../models/Borough');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const borough = await Borough.insert(req.body);
      res.json(borough);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const borough = await Borough.updateById(id, req.body);
      res.json(borough);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const borough = await Borough.getById(id);
      res.json(borough);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const boroughs = await Borough.getAll();
      console.log('boroughs', boroughs);
      res.json(boroughs);
    } catch (e) {
      next(e);
    }
  });
