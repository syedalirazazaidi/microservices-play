const express = require('express');
const router = express.Router();
const {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clearCart
} = require('../controllers/cartController');

router.get('/:userId', getCart);
router.post('/:userId/items', addItem);
router.put('/:userId/items/:itemId', updateItem);
router.delete('/:userId/items/:itemId', removeItem);
router.delete('/:userId', clearCart);

module.exports = router;

