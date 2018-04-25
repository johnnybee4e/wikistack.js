const express = require('express');
const models = require('../models');
const userRoute = require('./user.js');
const wikiRoute = require('./wiki.js');
let router = express.Router();

router.use('/wiki', wikiRoute);

router.use('/users', userRoute);

router.get('/', (req,res,next) => {
  res.render('index');
  next();
});


module.exports = router;
