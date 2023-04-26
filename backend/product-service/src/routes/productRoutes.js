import express from 'express';
import {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  getTopProducts,
  getProductsByUser,
  getProductsBySearch
} from '../controllers/productController.js';
import { protect, adminSeller } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').get(getProducts).post(protect, adminSeller, createProduct);
router.get('/user/:id', getProductsByUser);
router.get('/top', getTopProducts);
router.get('/search/:searchTerm', getProductsBySearch);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, adminSeller, deleteProduct)
  .put(protect, adminSeller, updateProduct);

export default router;
