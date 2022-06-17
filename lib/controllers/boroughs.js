const { Router } =  require('express');
const { Borough } = require('../models/Borough');

module.exports = Router()
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
