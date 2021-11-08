'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Spots', [{
     userId: 1,
     address: "1 Snake Mountain Drive",
     city: "Snake Mountain",
     state: "Grayskull",
     country: "Eternia",
     lat: 46.7751168342893, 
     lng: 23.521264526028716,
     name: "Snake Mountain",
     price: 666.00,
     createdAt: new Date(),
     updatedAt: new Date()
   }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Spots', null, {});
  }
};
