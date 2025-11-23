const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrder,
  getUserOrders,
  updateOrderStatus,
  getAllOrders
} = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/:id', getOrder);
router.get('/user/:userId', getUserOrders);
router.put('/:id/status', updateOrderStatus);
router.get('/', getAllOrders);

module.exports = router;

