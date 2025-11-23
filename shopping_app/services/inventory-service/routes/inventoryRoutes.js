const express = require('express');
const router = express.Router();
const {
  getInventory,
  addInventory,
  updateInventory,
  reserveInventory,
  releaseInventory,
  deductInventory,
  getLowStockItems
} = require('../controllers/inventoryController');

router.get('/:productId', getInventory);
router.post('/', addInventory);
router.put('/:productId', updateInventory);
router.post('/reserve', reserveInventory);
router.post('/release', releaseInventory);
router.post('/deduct', deductInventory);
router.get('/low-stock/all', getLowStockItems);

module.exports = router;

