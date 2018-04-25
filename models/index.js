const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle:{
    type: Sequelize.STRING,
    allowNull: false,
    // validate: {
    //   isUrl: true
    // }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open','close')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

Page.beforeValidate((page) => {
  console.log('hook fired', page.title);
  page.urlTitle = generateUrlTitle(page.title);
});


const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.findOrCreate({
  where: {
    id: Page.authorId
  }});

Page.belongsTo(User, {as: 'author'});

module.exports = {
  db, Page, User
};



function generateUrlTitle(title) {
  if(title) {
  return title.replace(/\s+/g,'_').replace(/\W/g,'');
  } else {
    return Math.random().toString(36).substring(2,7);
  }
}


// afterValidate: () => {
//   return '/wiki/' + this.urlTitle;
// }
