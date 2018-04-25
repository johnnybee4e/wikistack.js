const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const app = express();
const models = require('./models');
const routes = require('./routes');
app.use(morgan('dev'));

const env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(routes);





models.db.sync()
.then(function() {
  console.log('All table created!');
  app.listen(3000, () => {
    console.log('Running on port 3000!');
  });
})
.catch(console.error.bind(console));


