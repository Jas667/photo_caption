'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        type: Sequelize.UUID,
        allowNull:false,
        primaryKey: true,
        unique:true
      },
      photo_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Photos', key: 'photo_id'},
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      user_username: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'Users', key: 'username'},
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      comment: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  }
};