//create a router instance using express
const router = require('express').Router();
//import the controller
const photoController = require('../controllers/photos_controller');
//import the auth middleware
const auth = require('../middleware/auth.js');

//define the routes
router.get('/', photoController.listPhotos);
router.get('/:id', photoController.listOnePhoto);

router.post('/', auth.verifyToken, photoController.savePhoto);

router.delete('/', auth.verifyToken, photoController.deletePhoto);

router.put('/', auth.verifyToken, photoController.updatePhoto);





//export the router
module.exports = router;