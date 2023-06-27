'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Photos', {
      id: {
        type: Sequelize.UUID,
        allowNull:false,
        primaryKey: true,
        unique:true
      },
      user_username: {
        type: Sequelize.STRING,
        allowNull:false,
        references: { model: 'Users', key: 'username'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      photo_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique:true
      },
      title: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      url: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
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