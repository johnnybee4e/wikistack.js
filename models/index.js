const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page', {

});

const User = db.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
});
