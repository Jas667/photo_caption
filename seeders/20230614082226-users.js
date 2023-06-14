'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
      id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: '$2b$12$T3Ni9Htk/0QpoPfdAj3KT.5LWJNAe2rAaNYI1OT7ggf6BOjsskM0i',
      superUser: false,
      username: 'Johndoe',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@doe.com',
      password: '$2b$12$T3Ni9Htk/0QpoPfdAj3KT.5LWJNAe2rAaNYI1OT7ggf6BOjsskM0i',
      superUser: true,
      username: 'Janedoe',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@smith.com',
      password: '$2b$12$T3Ni9Htk/0QpoPfdAj3KT.5LWJNAe2rAaNYI1OT7ggf6BOjsskM0i',
      superUser: false,
      username: 'Johnsmith',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      password: '$2b$12$T3Ni9Htk/0QpoPfdAj3KT.5LWJNAe2rAaNYI1OT7ggf6BOjsskM0i',
      superUser: true,
      username: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
