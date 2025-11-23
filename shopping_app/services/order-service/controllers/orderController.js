const Order = require('../models/Order');
const axios = require('axios');

const CART_SERVICE_URL = process.env.CART_SERVICE_URL || 'http://localhost:3003';
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';

// Create order from cart
exports.createOrder = async (req, res) => {
  try {
    const { userId, shippingAddress } = req.body;

    // Get cart
    const cartResponse = await axios.get(`${CART_SERVICE_URL}/api/cart/${userId}`);
    const cart = cartResponse.data.cart;

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Get user for shipping address if not provided
    let finalShippingAddress = shippingAddress;
    if (!finalShippingAddress) {
      const userResponse = await axios.get(`${USER_SERVICE_URL}/api/users/${userId}`);
      finalShippingAddress = userResponse.data.user.address;
    }

    // Create order items from cart items
    const orderItems = cart.items.map(item => ({
      productId: item.productId._id || item.productId,
      name: item.productId.name || 'Product',
      quantity: item.quantity,
      price: item.price
    }));

    // Create order
    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount: cart.totalAmount,
      shippingAddress: finalShippingAddress
    });

    // Clear cart
    await axios.delete(`${CART_SERVICE_URL}/api/cart/${userId}`);

    res.status(201).json({ success: true, order });
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({ message: error.response.data.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

