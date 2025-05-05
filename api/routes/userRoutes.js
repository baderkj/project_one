const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body, validationResult } = require('express-validator');
const{UserValidator}=require('../validators/userValidator');

router.post('/signin', userController.signIn);

router.post('/',UserValidator, userController.createUser);
router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;