'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Photos', [
      {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        user_username: 'Johndoe',
        title: 'Photo 1',
        photo_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
        url: 'https://picsum.photos/200/300',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
        user_username: 'Janedoe',
        title: 'Photo 2',
        photo_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
        url: 'https://picsum.photos/200/400',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Photos', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
