'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    
   
    await queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email: "123@123",
      password: await bcrypt.hash('123', 10),
     }], {});
    
     await queryInterface.bulkInsert("Cards", [
      {
        title: "Clear shot",
        price: 100,
        image: "clear_shot.jpg", // Ссылка на изображение
        userId: 1,
      }
    ]);
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
