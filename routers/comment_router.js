//create a router instance using express
const router = require('express').Router();
//import the controller
const commentController = require('../controllers/comments_controller');

//define the routes
router.get('/', commentController.listComments);


//export the router
module.exports = router;