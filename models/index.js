const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    validate: {
      allowNull: false
    }
  },
  urlTitle:{
    type: Sequelize.STRING,
    validate: {
      allowNull: false,
      isUrl: true
    }
  },
  content: {
    type: Sequelize.TEXT,
    validate: {
      allowNull: false
    }
  },
  status: {
    type: Sequelize.ENUM('open','close')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  urlGetterMethods: {
    urlRoute() {
      return '/wiki/' + this.urlTitle;
    }
  }
});


const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    validate: {
      allowNull: false
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      allowNull: false,
      isEmail: true
    }
  },
});


module.exports = {
  db, Page, User
};
