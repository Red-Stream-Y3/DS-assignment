import express from 'express';
import {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  getTopProducts,
} from '../controllers/productController.js';
import { protect, adminSeller } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').get(getProducts).post(protect, adminSeller, createProduct);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, adminSeller, deleteProduct)
  .put(protect, adminSeller, updateProduct);

export default router;
