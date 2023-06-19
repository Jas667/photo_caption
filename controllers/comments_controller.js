const Comment = require('../models').Comment; //import Photos model
const uuidv4 = require('uuid-v4'); //import uuidv4
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

module.exports = {
      listComments(req, res) {
           const comment = Comment
                    .findAll({
                        order: [
                              ['createdAt', 'DESC'],
                        ]
                    }) //find all users
                        .then((comment) => { res.status(200).send(comment) }) //send users if successful
                        .catch((err) => { res.status(400).send(err) }); //catch any errors
      },
};