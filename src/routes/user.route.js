const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');

/**
  /api/users/store
 * /api/users/:id
 * /api/users/update
 * /api/users/delete/:id
*/
router.post('/store', userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);
router.delete('/:id', userController.deleteUserById);
router.put('/update', userController.updateUserById);

module.exports = router;