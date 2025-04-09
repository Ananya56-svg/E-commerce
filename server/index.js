const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get('/seed-products', async (req, res) => {
  await Product.deleteMany();
  const sampleProducts = [
    {
      name: 'Notebook',
      price: 50,
      image: 'https://m.media-amazon.com/images/I/71xblPRZxUL._SL1500_.jpg'
    },
    {
      name: 'Ball Pen Set',
      price: 120,
      image: 'https://m.media-amazon.com/images/I/61vHz+Pl5FL._SL1500_.jpg'
    },
    {
      name: 'Desk Lamp',
      price: 699,
      image: 'https://m.media-amazon.com/images/I/71tS9ZIF1jL._SL1500_.jpg'
    },
    {
      name: 'Wireless Mouse',
      price: 499,
      image: 'https://m.media-amazon.com/images/I/71fzbYci-OL._SL1500_.jpg'
    },
    {
      name: 'Bluetooth Headphones',
      price: 1299,
      image: 'https://m.media-amazon.com/images/I/71I8bdp7pDL._SL1500_.jpg'
    },
    {
      name: 'Laptop Stand',
      price: 899,
      image: 'https://m.media-amazon.com/images/I/61cuqdp5NXL._SL1500_.jpg'
    }
  ];
  await Product.insertMany(sampleProducts);
  res.send({ message: 'Products seeded' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
