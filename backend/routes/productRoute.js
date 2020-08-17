import express from 'express';
import Product from '../models/productModel';
import { isAdmin, isAuth } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    return res.send(products);
  } catch (error) {
    return res.status(500).send({ msg: error.messgae });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.send(product);
    } else {
      return res.status(404).send({ msg: 'product not  found' });
    }
  } catch (error) {
    return res.status(500).send({ msg: error.messgae });
  }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    const newProduct = await product.save();
    return res.status(201).send({
      message: 'New Product Created',
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).send({ message: 'Error in creating new product' });
  }
});
router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.description = req.body.description;
      product.countInStock = req.body.countInStock;
    }
    const updatedProduct = await product.save();
    return res.status(200).send({
      message: 'Product Updated',
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).send({ message: 'Error in Updating  product' });
  }
});
router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (product) {
      const result = await product.remove();
      return res.status(200).send({
        message: 'Product Deleted',
      });
    }
  } catch (error) {
    return res.status(500).send({ message: 'Error in Updating  product' });
  }
});

export default router;
