//create a router instance using express
const router = require('express').Router();
//import the controller
const commentController = require('../controllers/comments_controller');
//import the middleware
const auth = require('../middleware/auth');

//define the routes
router.get('/', commentController.listComments);
router.get('/:id', commentController.listOneComment);

router.post('/', auth.verifyToken, commentController.createComment);

router.put('/', auth.verifyToken, commentController.editComment);

router.delete('/', auth.verifyToken, commentController.deleteComment);


//export the router
module.exports = router;