const express = require('express');
let wikiRouter = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;



wikiRouter.get('/', (req,res,next) => {
  res.redirect('/');
});

wikiRouter.post('/', (req,res,next) => {
 User.findOrCreate({
   where: {
     email: req.body.authorEmail,
     name: req.body.authorName
   }
 })
    .spread((newUser, wasCreatedBool) => {
      return Page.create({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status
      })
      .then((createdPage) => {
        return createdPage.setAuthor(newUser);
      });
    })

    .catch(next)

  // const page = Page.build({
  //   title: req.body.title,
  //   content: req.body.content,
  //   status: req.body.status,
  // });
  // page.save()
  // .then(() => {
  //   const user = User.build({
  //     name: req.body.authorid,
  //     email: req.body.email
  //   })
  // })
  .then((page) => {
    res.redirect('/wiki/' + page.urlTitle);
    next();
  })
  .catch((err) => next(err));
});

wikiRouter.get('/add', (req,res,next) => {
  res.render('addpage');
});

wikiRouter.get('/:page', (req,res,next) => {
  Page.findOne({
    where: {
      urlTitle: req.params.page
    }
  })
  .then((page) => {
    if(page === null) {
      return next(new Error('That page was not found!'));
    }
    res.render('wikipage', page.dataValues);
  }

  );
});

module.exports = wikiRouter;
