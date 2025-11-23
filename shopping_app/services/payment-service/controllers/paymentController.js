const Payment = require('../models/Payment');
const axios = require('axios');

const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:3004';

// Generate unique transaction ID
const generateTransactionId = () => {
  return `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

// Process payment
exports.processPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod, paymentDetails } = req.body;

    // Verify order exists
    const orderResponse = await axios.get(`${ORDER_SERVICE_URL}/api/orders/${orderId}`);
    const order = orderResponse.data.order;

    if (order.status === 'cancelled') {
      return res.status(400).json({ message: 'Cannot process payment for cancelled order' });
    }

    // Create payment record
    const payment = await Payment.create({
      orderId,
      userId: order.userId,
      amount: order.totalAmount,
      paymentMethod,
      paymentDetails,
      transactionId: generateTransactionId(),
      status: 'processing'
    });

    // Simulate payment processing (in real app, integrate with payment gateway)
    setTimeout(async () => {
      // Simulate 90% success rate
      const isSuccess = Math.random() > 0.1;
      payment.status = isSuccess ? 'completed' : 'failed';
      payment.updatedAt = Date.now();
      await payment.save();

      // Update order status if payment successful
      if (isSuccess) {
        await axios.put(`${ORDER_SERVICE_URL}/api/orders/${orderId}/status`, {
          status: 'processing'
        });
      }
    }, 2000);

    res.status(201).json({
      success: true,
      payment,
      message: 'Payment is being processed'
    });
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({ message: error.response.data.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Get payment by ID
exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get payment by order ID
exports.getPaymentByOrder = async (req, res) => {
  try {
    const payment = await Payment.findOne({ orderId: req.params.orderId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found for this order' });
    }
    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Refund payment
exports.refundPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (payment.status !== 'completed') {
      return res.status(400).json({ message: 'Only completed payments can be refunded' });
    }

    payment.status = 'refunded';
    payment.updatedAt = Date.now();
    await payment.save();

    res.json({ success: true, payment, message: 'Payment refunded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

