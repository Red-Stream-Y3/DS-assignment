import express from 'express';
import {
    getSellerById,
    getSellers,
    updateSeller
} from '../controllers/sellerController.js';

const router = express.Router();

router.route('/').get(getSellers);
router.route('/:id').get(getSellerById).put(updateSeller);

export default router;