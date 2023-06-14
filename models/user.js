'use strict';
const {
  Model
} = require('sequelize');

const uuid = require('uuid-v4');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Comment)
    }
    //beforeCreate function to generate uuid
    beforeCreate() {
      this.id = uuid();
    }

  }
  User.init({
    firstName: { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Please enter a valid first name'
        }
      }
    },
    lastName: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Please enter a valid last name'
        }
      } 
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email address Mick',
        }
      } 
    },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Please enter a password between 8 and 99 characters long'
        }
      }
    },
    superUser: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false, 
      defaultValue: false 
    },
    username: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: { msg: 'Username already exists' },
      validate: {
        len: {
          args: [1, 99],
          msg: 'Username must be between 1 and 99 characters long',
        },
      } 
    }
  }, { 
    hooks: {
      beforeCreate: (pendingUser, options) => {
        if (pendingUser && pendingUser.password) {
          //hash the password before saving it to the database
          let hash = bcrypt.hashSync(pendingUser.password, 12);
          pendingUser.password = hash;
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};