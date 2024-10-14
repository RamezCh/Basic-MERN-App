import express from 'express';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

const app = express();

app.use(express.json()); // allows us to accept json data in the req.body

app.post('/api/products', async (req, res) => {
  const product = req.body; // user will send this data
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide all fields' });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.error('Error in Create product:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
});

app.get('/', (req, res) => {
  res.send('Server is ready!');
});

app.listen(5000, () => {
  connectDB();
  console.log('Server started at http://localhost:5000');
});
