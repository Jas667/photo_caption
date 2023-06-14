const User = require('../models').User; //import User model
const uuidv4 = require('uuid-v4'); //import uuidv4
const bcrypt = require('bcrypt'); //import bcrypt
const jwt = require('jsonwebtoken'); //import jsonwebtoken
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];


module.exports = {
    listUsers(req, res) {
      return User
            .findAll({ 
                  order: [
                        ['createdAt', 'DESC'],
                  ]
            }) //find all users
            .then((users) => { res.status(200).send(users) }) //send users if successful
            .catch((err) => { res.status(400).send(err) }); //catch any errors
      },

     createUser(req, res) {
      return User
            .create({
                  id: uuidv4(),
                  username: req.body.username,
                  password: req.body.password,
                  email: req.body.email,
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  superUser: req.body.superUser,
            }) //create a user
            .then((user) => { res.status(201).send(`${req.body.username} created successfully`) }) //send user if successful
            .catch((err) => { res.status(400).send(err) }); //catch any errors
     },
     login(req, res) {
      const user = User
            .findOne({
                  where: {
                        username: req.body.username
                  }
            }) //find a user
            .then((user) => {
                  if (!user) {
                        return res.status(404).send({ message: 'User Not Found' });
                  }
                  bcrypt.compare(req.body.password, user.password, function (err, result) {
                        if (result) {
                              res.clearCookie('token');
                              //assign a token
                              const payload = {
                                    id: user.id,
                                    username: user.username,
                                    superUser: user.superUser
                              };
                              const token = jwt.sign(payload, config.jwtSecret);
                              //set cookie
                              res.cookie('token', token, {
                                    httpOnly: true,
                                    secure: false,
                                    sameSite: 'none',
                                    maxAge: 6 * 60 * 60 * 1000,
                              });
                              return res.status(200).send({ message: 'Login Successful' });
                        } else {
                              return res.status(401).send({ message: 'Login Failed' });
                        }
                  });
            }) //send user if successful
            .catch((err) => { res.status(400).send(err) }); //catch any errors
     },
     //logout
      logout(req, res) {
            res.clearCookie('token');
            res.redirect('/');
            res.status(200).send();
            return;
      },
      //allow user to delete their own profile. If superuser, allow deletion of any profile
      deleteUser(req, res) {
            const username = req.username;
            const superUser = req.superUser;
            const userToDelete = req.body.username;
          
            // if superuser, delete any user
            if (superUser || userToDelete === username) {
              const user = User.destroy({
                where: { username: userToDelete }
              });
              return user
              .then(user => {
                res.status(200).send({ message: `${userToDelete} deleted successfully` });
              })
              .catch(err => {
                res.status(400).send(err);
              });
            } else {
              return res.status(401).send({ message: 'You are not authorised to delete this user' });
            }
          },
      //test authorisation middleware
      test(req, res) {
            return res.status(200).send({ message: 'Authorised' });
      },
};