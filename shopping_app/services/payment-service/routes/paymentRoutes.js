const express = require('express');
const router = express.Router();
const {
  processPayment,
  getPayment,
  getPaymentByOrder,
  refundPayment
} = require('../controllers/paymentController');

router.post('/', processPayment);
router.get('/:id', getPayment);
router.get('/order/:orderId', getPaymentByOrder);
router.post('/:id/refund', refundPayment);

module.exports = router;

