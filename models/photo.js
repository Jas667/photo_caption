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

    //beforeCreate function to generate uuid
    beforeCreate() {
      this.id = uuid();
    }

  }
  Photo.init({
    user_username: { 
      type:DataTypes.STRING, 
      allowNull:false, 
      unique:true 
    },
    title: { 
      type:DataTypes.STRING, 
      allowNull:false, 
      unique:true,
      validate: {
        len: [1, 99]
      }
    },
    url: { 
      type:DataTypes.STRING, 
      allowNull:false, 
      unique:true,
      validate: {
        isUrl: true
      }
    }
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};