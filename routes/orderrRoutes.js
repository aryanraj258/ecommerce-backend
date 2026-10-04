const express = require('express');
const router = express.Router();
const Orderr = require('../models/Orderr');

// Create New Orderr
router.post('/', async (req, res) => {
  try {
    const { user, orderItems, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No items in orderr' });
    }

    const orderr = new Orderr({
      user,
      orderItems,
      totalPrice
    });

    const savedOrderr = await orderr.save();
    res.status(201).json(savedOrderr);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Orderrs for Specific User
router.get('/:userName', async (req, res) => {
  try {
    const orderrs = await Orderr.find({ user: req.params.userName }).sort({ createdAt: -1 });
    res.json(orderrs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;