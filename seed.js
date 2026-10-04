const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Brand = require('./models/Brand');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce_db')
  .then(async () => {
    console.log('Connected to MongoDB...');

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Brand.deleteMany({});

    // 1. Create Sample Categories (Category schema requires 'title')
    const cat1 = await Category.create({ title: 'Juices', name: 'Juices' });
    const cat2 = await Category.create({ title: 'Footwear', name: 'Footwear' });
    const cat3 = await Category.create({ title: 'Milk Products', name: 'Milk Products' });

    // 2. Create Sample Brands
    const brand1 = await Brand.create({ title: 'Tropicana', name: 'Tropicana' });
    const brand2 = await Brand.create({ title: 'Nike', name: 'Nike' });
    const brand3 = await Brand.create({ title: 'Amul', name: 'Amul' });

    // 3. Create Sample Products
    await Product.insertMany([
      {
        title: 'Fresh Apple Juice',
        description: '100% Organic & Fresh Apple Juice 1L',
        price: 120,
        category: cat1._id,
        brand: brand1._id,
        images: ['https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300']
      },
      {
        title: 'Nike Sports Shoes',
        description: 'Lightweight running shoes for men',
        price: 2999,
        category: cat2._id,
        brand: brand2._id,
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300']
      },
      {
        title: 'Amul Fresh Milk',
        description: 'Pasteurised Toned Milk 1L Pack',
        price: 66,
        category: cat3._id,
        brand: brand3._id,
        images: ['https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300']
      }
    ]);

    console.log('Sample Data Added Successfully!');
    process.exit();
  })
  .catch(err => {
    console.error('Error seeding data:', err);
    process.exit(1);
  });