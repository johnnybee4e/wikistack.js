const express = require('express');
const models = require('../models');
let Page = models.Page;
let User = models.User;
const userRoute = require('./user.js');
const wikiRoute = require('./wiki.js');
let router = express.Router();


router.get('/', (req,res,next) => {
  Page.findAll()
  .then((pages) => {
    res.render('index', {pages});
  });
});


router.use('/wiki', wikiRoute);

router.use('/users', userRoute);




module.exports = router;
