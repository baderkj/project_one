const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body, validationResult } = require('express-validator');
const { UserValidator } = require('../validators/userValidator');
const authMiddleware = require('../../middleware/authMiddleware');
const hasPermission = require('../../middleware/hasPermission');

router.post('/signin', userController.signIn);
router.post(
  '/',
  UserValidator,
  authMiddleware,
  hasPermission('create_user'),
  userController.createUser
);
router.get(
  '/',
  authMiddleware,
  hasPermission('show_users'),
  userController.getAllUsers
);

router.get('/search/:name', userController.search);
router.get('/paginate', userController.paginate);

router.get('/:id', userController.getUser);
router.put('/:id', hasPermission('update_user'), userController.updateUser);
router.delete('/:id', hasPermission('delete_user'), userController.deleteUser);

module.exports = router;
