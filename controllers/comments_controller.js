const Comment = require('../models').Comment; //import Photos model
const uuidv4 = require('uuid-v4'); //import uuidv4
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
//import and set cache
const CacheService = require('./cache_controller');
const cache = new CacheService(3600); // cache 1 hour
const CACHE_KEY = 'comments';

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
      listOneComment(req, res) {
            cache.get(`${CACHE_KEY}_${req.params.id}`, () => Comment
                  .findOne({
                        where: {
                              id: req.params.id
                        }
                  }))//find one user
                  .then((comment) => { res.status(200).send(comment) }) //send user if successful
                  .catch((err) => { res.status(400).send(err) }); //catch any errors
      },
      createComment(req, res) {
            const comment = Comment
                  .create({
                        id: uuidv4(),
                        photo_id: req.body.photo_id,
                        user_username: req.username,
                        comment: req.body.comment
                  }) //create a comment
                  .then((comment) => { res.status(200).send(`Comment added: ${req.body.comment}`) }) //send comment if successful
                  .catch((err) => { res.status(400).send(err) }); //catch any errors
      },
      deleteComment(req, res) {
            const commentId = req.params.comment_id;
            const superUser = req.superUser;
            const userUsername = req.username;
            
            const comment = Comment
                  .findOne({
                        where: {
                              id: commentId
                        }
                  }) //find corresponding comment
                  .then((comment) => {
                        if (!comment) {
                              res.status(404).send({ message: 'Comment Not Found' });
                        } else if (superUser || userUsername === comment.user_username) {
                              //delete comment
                              Comment.destroy({
                                    where: {
                                          id: commentId
                                    },
                              })
                              //delete cache
                              .then(() => cache.del(`${CACHE_KEY}_${commentId}`))
                              .then(() => {
                                    res.status(200).send({ message: 'Comment deleted successfully' });
                              })
                              .catch((err) => {
                                    res.status(400).send(err);
                              });
                        } else {
                              res.status(403).send({ message: 'You are not authorized to delete this comment' });
                        }
                  })
      },
      editComment(req, res) {
            const commentId = req.body.comment_id;
            const superUser = req.superUser;
            const userUsername = req.username;

            const comment = Comment
                  .findOne({
                        where: {
                              id: commentId
                        }
                  }) //find corresponding comment
                  .then((comment) => {
                        if (!comment) {
                              res.status(404).send({ message: 'Comment Not Found' });
                        } else if (superUser || userUsername === comment.user_username) {
                              //edit comment
                              Comment.update({
                                    comment: req.body.comment
                              }, {
                                    where: {
                                          id: commentId
                                    }
                              })
                              //delete cache
                              .then(() => cache.del(`${CACHE_KEY}_${commentId}`))
                              .then(() => {
                                    res.status(200).send({ message: 'Comment updated successfully' });
                              })
                              .catch((err) => {
                                    res.status(400).send(err);
                              });
                        } else {
                              res.status(403).send({ message: 'You are not authorized to edit this comment' });
                        }
                  })
      },
};