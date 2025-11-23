const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getUser,
  updateUser,
  getAllUsers
} = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.get('/', getAllUsers);

module.exports = router;

