import express from 'express';
import {
    getshopById,
    getshops,
    updateshop, createShop
} from '../controllers/shopcontroller.js';
import { protect, admin,  seller } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(createShop, protect, admin, seller);
router.route('/').get(getshops, protect, admin, seller);
router.route('/:id').get(getshopById, protect, admin, seller).put(updateshop, protect, admin, seller);

export default router;