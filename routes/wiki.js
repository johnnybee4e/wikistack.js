const express = require('express');
const models = require('../models');
let wikiRouter = express.Router();



wikiRouter.get('/', (req,res,next) => {
  res.redirect('/');
  next();
});

wikiRouter.post('/', (req,res,next) => {
  console.log("*****", req.body)
  res.json(req.body);
  next();
});

wikiRouter.get('/add', (req,res,next) => {
  res.render('addpage');
  next();
});

module.exports = wikiRouter;
