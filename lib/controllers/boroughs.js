const { Router } =  require('express');
const { Borough } = require('../models/Borough');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const boroughs = await Borough.getAll();
      console.log('boroughs', boroughs);
      res.json(boroughs);
    } catch (e) {
      next(e);
    }
  });
