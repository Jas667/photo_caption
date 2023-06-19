'use strict';
const {
  Model
} = require('sequelize');

const uuid = require('uuid-v4');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, { 
        foreignKey: { 
          name: 'user_username', 
          allowNull: false,
          references: { model: 'Users', key: 'username' }
      } });
      Comment.belongsTo(models.Photo, { 
        foreignKey: { 
          name: 'photo_id', 
          allowNull: false,
          references: { model: 'Photos', key: 'photo_id' }
        } });
    }

    //beforeCreate function to generate uuid
    beforeCreate() {
      this.id = uuid();
    }

  }
  Comment.init({
    photo_id: DataTypes.UUID,
    user_username: DataTypes.STRING,
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Comment must be between 1 and 255 characters long',
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};