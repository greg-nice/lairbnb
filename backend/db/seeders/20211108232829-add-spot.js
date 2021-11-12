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
     url: "https://i.etsystatic.com/27594719/r/il/15381d/3049860902/il_1588xN.3049860902_bep6.jpg",
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
     userId: 1,
     address: "Mount Shinmoedake",
     city: "Kirimishimataguchi",
     state: "Kagoshima",
     country: "Japan",
     lat: 31.91133608282428,
     lng: 130.88683985028317,
     name: "Blofield's Volcano Lair",
     price: 7500.00,
     url: "https://i.guim.co.uk/img/media/ea3b0d576028663ce489ca63e61ffde45bbe2631/0_181_2142_1285/master/2142.jpg?width=1020&quality=45&auto=format&fit=max&dpr=2&s=82fc39e770f2a9ca8f1547d0900cef4d",
     createdAt: new Date(),
     updatedAt: new Date()
    },
    {
      userId: 1,
      address: "1 Valley Dr",
      city: "Beluga Lake",
      state: "Alaska",
      country: "USA",
      lat: 61.429779098549474,
      lng: -151.42778492660594,
      name: "Nathan Bateman's Alaskan Lair",
      price: 15500.00,
      url: "https://media.vanityfair.com/photos/553922f843ab7eb66f6a3342/master/w_960,c_limit/ex-machina-design-4.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      address: "Tyrrhenian Sea",
      city: "Atlantis",
      state: "Sardinia",
      country: "Italy",
      lat: 40.33531300992283,
      lng: 10.811910998031,
      name: "Karl Stromberg's Atlantis",
      price: 19000.00,
      url: "https://cdn3.whatculture.com/images/2019/01/31939a851d996d1c-600x338.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      address: "3825 Mürren",
      city: "Schilthorn",
      state: "Canton of Bern",
      country: "Switzerland",
      lat: 46.56041490800649,
      lng: 7.836413470164452,
      name: "Piz Gloria",
      price: 12000.00,
      url: "http://vignette2.wikia.nocookie.net/jamesbond/images/4/4d/OHMSS_-_Piz_Gloria_%281%29.png/revision/latest?cb=20160414153938",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 1,
      address: "101 EngleField Ave",
      city: "London",
      state: "Greater London",
      country: "England",
      lat: 51.44329298110585,
      lng: -1.1061407992583614,
      name: "Hell Hall",
      price: 2500.00,
      url: "https://64.media.tumblr.com/3a3728a38105262bd6f58f0c84a3a8d2/c517d3c932300572-2a/s2048x3072/54c16ebd1902e613d62275a4cdd37eae043d696f.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])},

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
