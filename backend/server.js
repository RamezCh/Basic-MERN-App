import express from 'express';
import { connectDB } from './config/db.js';

import productRoutes from './routes/product.route.js';

const app = express();

app.use(express.json()); // allows us to accept json data in the req.body

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Server is ready!');
});

app.listen(5000, () => {
  connectDB();
  console.log('Server started at http://localhost:5000');
});
