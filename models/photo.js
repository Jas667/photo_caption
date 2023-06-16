'use strict';
const {
  Model
} = require('sequelize');

const uuid = require('uuid-v4');

module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Photo.hasMany(models.Comment)
    }

  }
  Photo.init({
    user_username: { 
      type:DataTypes.STRING, 
      allowNull:false 
    },
    title: { 
      type:DataTypes.STRING, 
      allowNull:false, 
      unique:true,
      validate: {
        len: [1, 99]
      }
    },
    photo_id: {
      type:DataTypes.UUID,
      allowNull:false,
      unique:true
    },
    url: { 
      type:DataTypes.STRING, 
      allowNull:false, 
      unique:true,
      validate: {
        isUrl: true
      }
    },
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};