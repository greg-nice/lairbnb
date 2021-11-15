'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'DemoUser',
        hashedPassword: bcrypt.hashSync('password'),
        url: "https://www.alaska.edu/_resources/images/placeholders/profile.png"
      },
      {
        email: faker.internet.email(),
        username: 'Dr. Evil',
        hashedPassword: bcrypt.hashSync('password'),
        url: "https://miro.medium.com/max/700/1*ZYpBSAe0dC4_ha-3GhcO9Q.jpeg"
      },
      {
        email: faker.internet.email(),
        username: 'Hal 9000',
        hashedPassword: bcrypt.hashSync('password'),
        url: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/newscms/2018_46/2642661/1811111-hal-9000-1155p.jpg"
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['DemoUser', 'Dr. Evil', 'Hal 9000'] }
    }, {});
  }
};
