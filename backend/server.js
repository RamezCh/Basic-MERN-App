import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

import productRoutes from './routes/product.route.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); // allows us to accept json data in the req.body

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Server is ready!');
});

app.listen(PORT, () => {
  connectDB();
  console.log('Server started at http://localhost:' + PORT);
});
