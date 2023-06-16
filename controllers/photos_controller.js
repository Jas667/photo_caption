const Photo = require('../models').Photo; //import Photos model
const uuidv4 = require('uuid-v4'); //import uuidv4
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

module.exports = {
      listPhotos(req, res) {
            const photo = Photo
                  .findAll({ 
                        order: [
                              ['createdAt', 'DESC'],
                        ]
                  }) //find all users
                  .then((photos) => { res.status(200).send(photos) }) //send users if successful
                  .catch((err) => { res.status(400).send(err) }); //catch any errors
            },
      savePhoto(req, res) {
            const photo = Photo
                  .create({
                        id: uuidv4(),
                        title: req.body.title,
                        url: req.body.url,
                        user_username: req.body.user_username,
                        photo_id: uuidv4(),
                  }) //create a photo
                  .then((photo) => { res.status(201).send(`${req.body.title} created successfully`) }) //send photo title if successful
                  .catch((err) => { res.status(400).send(err) }); //catch any errors
      },
      deletePhoto(req, res) {
            const photoId = req.body.photo_id;
            const superUser = req.superUser;
            const userUsername = req.username;

            const photo = Photo
                  .findOne({
                        where: {
                              photo_id: photoId
                        }
                  }) //find corresponding photo
                  .then((photo) => {
                        if (!photo) {
                              res.status(404).send({ message: 'Photo Not Found' });
                        } else if (superUser || userUsername === photo.user_username) {
                              //delete photo
                              Photo.destroy({
                                    where: {
                                          photo_id: photoId
                                    },
                              })
                              .then(() => {
                                    res.status(200).send({ message: 'Photo deleted successfully' });
                              });
                        } else {
                              res.status(403).send({ message: 'You are not authorized to delete this photo' });
                        }
                  })
                  .catch((err) => { res.status(400).send(err) }); //catch any errors
      },
      updatePhoto(req, res) {

            const photoId = req.body.photo_id;
            const photoTitle = req.body.title;
            const photoUrl = req.body.url;
            const superUser = req.superUser;
            const userUsername = req.username;

            const photo = Photo
                  .findOne({
                        where: {
                              photo_id: photoId
                        }
                  }) //find corresponding photo
                  .then((photo) => {
                        if (!photo) {
                              res.status(404).send({ message: 'Photo Not Found' });
                        } else if (superUser || userUsername === photo.user_username) {
                              //update photo
                              Photo.update({
                                    title: photoTitle,
                                    url: photoUrl
                              }, {
                                    where: {
                                          photo_id: photoId
                                    }
                              })
                              .then(() => {
                                    res.status(200).send({ message: 'Photo updated successfully' });
                              });
                        } else {
                              res.status(403).send({ message: 'You are not authorized to update this photo' });
                        }
                  })
                  .catch((err) => { res.status(400).send(err) }); //catch any errors

      },
};