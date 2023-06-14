'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        photo_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
        user_username: 'Johndoe',
        comment: 'This is a comment',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
        photo_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
        user_username: 'Janedoe',
        comment: 'This is another comment',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
