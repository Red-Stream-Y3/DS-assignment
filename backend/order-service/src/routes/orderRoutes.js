import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  updateOrderToConfirm,
  updateOrderToReject,
  queryOrders;
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(getOrders);
router.route('/:id').get(getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/confirm').put(updateOrderToConfirm);
router.route('/:id/reject').put(updateOrderToReject);
router.route('/query').post(queryOrders);

export default router;
