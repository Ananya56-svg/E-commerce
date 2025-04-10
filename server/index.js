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
      image: 'https://drive.google.com/uc?export=view&id=1PJEw_3RoMkWvqXv_9eWrbd98ZYNvfDF0'

    },
    {
      name: 'Ball Pen Set',
      price: 120,
      image: 'https://drive.google.com/uc?export=view&id=1FcIhpp6iMlfgMQVZNTWaqiMNyRme8MSj'
    },
    {
      name: 'Desk Lamp',
      price: 699,
      image: 'https://drive.google.com/uc?export=view&id=1uteWy2PsvqU0pQKwgu-QenA6_vAIth50'
    },
    {
      name: 'Wireless Mouse',
      price: 499,
      image: 'https://drive.google.com/uc?export=view&id=1WfpaLLGUkefZTaCXr14utPXwJZPV3PW2'
    },
    {
      name: 'Bluetooth Headphones',
      price: 1299,
      image: 'https://drive.google.com/uc?export=view&id=1uYFNTrGRq4mM2pBRXsfMMJw6fm1O09LQ'
    },
    {
      name: 'Laptop Stand',
      price: 899,
      image: 'https://drive.google.com/uc?export=view&id=1YNj3JW3GFFcjTNhO3uTl7Es94_Ww45Po'
    }
  ];
  await Product.insertMany(sampleProducts);
  res.send({ message: 'Products seeded' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
