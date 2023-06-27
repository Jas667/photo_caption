const User = require('../models').User; //import User model
const uuidv4 = require('uuid-v4'); //import uuidv4
const bcrypt = require('bcrypt'); //import bcrypt
const jwt = require('jsonwebtoken'); //import jsonwebtoken
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

//import and set cache
const CacheService = require('./cache_controller');
const cache = new CacheService(3600); // cache 1 hour
const CACHE_KEY = 'users';


module.exports = {
    listUsers(req, res) {
      cache.get(`${CACHE_KEY}_${req.params.id}`, () => User
            .findAll({ 
                  order: [
                        ['createdAt', 'DESC'],
                  ]
            })) //find all users
            .then((users) => { res.status(200).send(users) }) //send users if successful
            .catch((err) => { res.status(400).send(err) }); //catch any errors
      },
      listOneUser(req, res) {
            cache.get(`${CACHE_KEY}_${req.params.id}`, () => User
                  .findOne({
                        where: {
                              id: req.params.id
                        }
                  }))//find one user
                  .then((user) => { res.status(200).send(user) }) //send user if successful
                  .catch((err) => { res.status(400).send(err) }); //catch any errors
      },

     createUser(req, res) {
      const user = User
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
                        res.status(404).send({ message: 'User Not Found' });
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
                              res.status(200).send({ message: 'Login Successful' });
                        } else {
                              res.status(401).send({ message: 'Login Failed. Incorrect Password.' });
                        }
                  });
            }) //send user if successful
            .catch((err) => { res.status(400).send(err) }); //catch any errors
     },
     //logout
      logout(req, res) {
            res.clearCookie('token');
            res.status(200).redirect('/');
      },
      //allow user to delete their own profile. If superuser, allow deletion of any profile
      deleteUser(req, res) {
            const username = req.username;
            const superUser = req.superUser;
            const userToDelete = req.params.username;
          
            // if superuser, delete any user
            if (superUser || userToDelete === username) {
              const user = User.destroy({
                where: { username: userToDelete }
              });
              //delete cache
              user
              .then(cache.del(`${CACHE_KEY}_${req.params.id}`))
              .then(user => {
                res.status(200).send({ message: `${userToDelete} deleted successfully` });
              })
              .catch(err => {
                res.status(400).send(err);
              });
            } else {
              res.status(401).send({ message: 'You are not authorised to delete this user' });
            }
          },
      //allow user to update their own profile. If superuser, allow update of any profile
      updateUser(req, res) {
            const Userid = req.userId;
            const superUser = req.superUser;
            const userToUpdate = req.body.id;
            const updates = Object.entries(req.body);
            
            //loop through updates and update the key/value pairs
            // if superuser, update any user or if user is updating their own profile allow update
            if (superUser || userToUpdate === Userid) {
                  for (const [key, value] of updates) {
                        if (key !== 'id' && key !== 'password') {
                              const user = User.update({
                                    [key]: value
                              }, {
                                    where: { id: userToUpdate }
                              });
                              user
                                    //delete cache
                                    .then(cache.del(`${CACHE_KEY}_${req.params.id}`))
                                    .catch(err => {
                                          res.status(400).send(err);
                                    });
                        }
                  }
                  res.status(200).send({ message: `${userToUpdate} updated successfully` });
            } else {
                  res.status(401).send({ message: 'You are not authorised to update this user' });
            }

      },
      updateUserPassword(req, res) {
            const userId = req.userId;
            const superUser = req.superUser;
            const userToUpdate = req.body.id;
            const currentPassword = req.body.password;
            const newPassword = req.body.newPassword;

            // if superuser, update any user or if user is updating their own profile allow update
            if (superUser || userToUpdate === userId) {
                  const user = User.findOne({
                        where: { id: userToUpdate }
                  })
                        .then((user) => {
                              //check if current password is correct
                              bcrypt.compare(currentPassword, user.password, function (err, result) {
                                    if (result) {
                                          //hash the new password
                                          bcrypt.hash(newPassword, 10, function (err, hash) {
                                                const user = User.update({
                                                      password: hash
                                                }, {
                                                      where: { id: userToUpdate }
                                                });
                                                user
                                                      //delete cache
                                                      .then(cache.del(`${CACHE_KEY}_${req.params.id}`))
                                                      .then(user => {
                                                            res.status(200).send({ message: `${userToUpdate} updated successfully` });
                                                      })
                                                      .catch(err => {
                                                            res.status(400).send(err);
                                                      });
                                          });
                                    } else {
                                          res.status(401).send({ message: 'Incorrect password provided' });
                                    }
                              });
                        })
            } else {
                  res.status(401).send({ message: 'You are not authorised to update this users password' });
            }
      },
      //test authorisation middleware
      test(req, res) {
            res.status(200).send({ message: 'Authorised' });
      },
};