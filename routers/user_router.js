//create a router instance using express
const router = require('express').Router();
//import the controller
const userController = require('../controllers/users_controller');
//import the auth middleware
const auth = require('../middleware/auth.js');

//define the routes
router.get('/select/:id', auth.verifyToken, userController.listOneUser);
router.get('/all', userController.listUsers);
// router.get('/test', auth.verifyToken, userController.test); //testing the auth middleware
router.get('/logout', userController.logout);

router.post('/', userController.createUser);
router.post('/login', userController.login);

router.put('/update', auth.verifyToken, userController.updateUser);
router.put('/updatepassword', auth.verifyToken, userController.updateUserPassword)

router.delete('/delete/:username', auth.verifyToken, userController.deleteUser);



//export the router
module.exports = router;
