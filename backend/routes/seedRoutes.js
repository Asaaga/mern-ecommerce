import express from 'express';
const seedRouter = express.Router();
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

seedRouter.get('/', async (req, res) => {
    await Product.remove({});
     const createdProduct = await Product.insertMany(data.products);
     await User.remove({});
     const createdUsers = await User.insertMany(data.users);
     res.send({ createdProduct, createdUsers });
});

export default seedRouter;