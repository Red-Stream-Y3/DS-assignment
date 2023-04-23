import express from 'express';
import {
  getshopById,
  getshops,
  updateshop,
  createShop,
} from '../controllers/shopcontroller.js';
import { protect, adminSeller } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(createShop, protect, adminSeller);
router.route('/').get(getshops, protect, adminSeller);
router
  .route('/:id')
  .get(getshopById, protect, adminSeller)
  .put(updateshop, protect, adminSeller);

export default router;
