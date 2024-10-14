import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.log('Error in fetching products:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: 'Invalid Product Id' });
  }

  try {
    // new = true means it return updated obj instead of old
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: `Product with ID ${id} deleted` });
  } catch (err) {
    console.log('Error in deleting product:', err.message);
    res.status(404).json({ success: false, message: 'Product not found' });
  }
});

export default router;
