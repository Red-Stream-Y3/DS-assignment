import express from 'express';
import {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  getTopProducts,
} from '../controllers/productController.js';
import { protect, admin, seller } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').get(getProducts).post(protect, admin, seller, createProduct);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, seller, deleteProduct)
  .put(protect, admin, seller, updateProduct);

export default router;
