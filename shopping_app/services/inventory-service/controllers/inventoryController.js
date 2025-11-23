const Inventory = require('../models/Inventory');

// Get inventory by product ID
exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ productId: req.params.productId });
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found for this product' });
    }
    res.json({ success: true, inventory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add or update inventory
exports.addInventory = async (req, res) => {
  try {
    const { productId, quantity, lowStockThreshold } = req.body;
    
    let inventory = await Inventory.findOne({ productId });
    if (inventory) {
      inventory.quantity += quantity;
      if (lowStockThreshold) inventory.lowStockThreshold = lowStockThreshold;
      inventory.updatedAt = Date.now();
      await inventory.save();
    } else {
      inventory = await Inventory.create({
        productId,
        quantity,
        lowStockThreshold: lowStockThreshold || 10
      });
    }
    
    res.json({ success: true, inventory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update inventory
exports.updateInventory = async (req, res) => {
  try {
    const { quantity, lowStockThreshold } = req.body;
    const inventory = await Inventory.findOneAndUpdate(
      { productId: req.params.productId },
      { quantity, lowStockThreshold, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    
    res.json({ success: true, inventory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reserve inventory
exports.reserveInventory = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const inventory = await Inventory.findOne({ productId });
    
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    
    if (inventory.availableQuantity < quantity) {
      return res.status(400).json({
        message: 'Insufficient inventory',
        available: inventory.availableQuantity,
        requested: quantity
      });
    }
    
    inventory.reservedQuantity += quantity;
    await inventory.save();
    
    res.json({ success: true, inventory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Release inventory (when order is cancelled or payment fails)
exports.releaseInventory = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const inventory = await Inventory.findOne({ productId });
    
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    
    if (inventory.reservedQuantity < quantity) {
      return res.status(400).json({
        message: 'Cannot release more than reserved quantity',
        reserved: inventory.reservedQuantity,
        requested: quantity
      });
    }
    
    inventory.reservedQuantity -= quantity;
    await inventory.save();
    
    res.json({ success: true, inventory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Deduct inventory (when order is confirmed)
exports.deductInventory = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const inventory = await Inventory.findOne({ productId });
    
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    
    if (inventory.reservedQuantity < quantity) {
      return res.status(400).json({
        message: 'Insufficient reserved inventory',
        reserved: inventory.reservedQuantity,
        requested: quantity
      });
    }
    
    inventory.quantity -= quantity;
    inventory.reservedQuantity -= quantity;
    await inventory.save();
    
    res.json({ success: true, inventory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get low stock items
exports.getLowStockItems = async (req, res) => {
  try {
    const lowStockItems = await Inventory.find({
      $expr: { $lte: ['$availableQuantity', '$lowStockThreshold'] }
    });
    
    res.json({ success: true, count: lowStockItems.length, items: lowStockItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

