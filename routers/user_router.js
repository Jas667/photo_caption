//create a router instance using express
const router = require('express').Router();
//import the controller
const userController = require('../controllers/users_controller');
//import the auth middleware
const auth = require('../middleware/auth.js');

//define the routes
router.get('/', userController.listUsers);
router.get('/test', auth.verifyToken, userController.test);
router.get('/logout', userController.logout);

router.post('/', userController.createUser);
router.post('/login', userController.login);

router.delete('/delete', auth.verifyToken, userController.deleteUser);



//export the router
module.exports = router;
