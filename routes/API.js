const express = require ('express');
const router = express.Router();
const APIController = require('../controllers/APIController')

router.get('/users', APIController.usersList);
router.get('/users/:id', APIController.userDetails);
router.get('/products', APIController.listado);
router.get('/products/:id', APIController.detail);

module.exports = router;