const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

// ALL MONGOOSE MODELS REGISTRATION (Isse Category/Brand error fixed ho jayega)
require('./models/User');
require('./models/Category');
require('./models/Brand');
require('./models/Product');

const app = express();

app.use(cors());
app.use(express.json());

// Routes Integration
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orderrs', require('./routes/orderrRoutes'));
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));