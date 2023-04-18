import Seller from "../models/sellerModel";
import asyncHandler from "express-async-handler";

// @desc    Fetch seller by id
// @route   GET /api/sellers/:id
// @access  Public
const getSellerById = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.params.id);

  if (seller) {
    res.json(seller);
  } else {
    res.status(404);
    throw new Error("Seller not found");
  }
});

// @desc    Fetch all sellers
// @route   GET /api/sellers
// @access  Public
const getSellers = asyncHandler(async (req, res) => {
  const sellers = await Seller.find({});
  res.json(sellers);
});

// @desc    Update a seller
// @route   PUT /api/sellers/:id
// @access  Private/Admin
const updateSeller = asyncHandler(async (req, res) => {
    const seller = await Seller.findById(req.params.id);
    
    if (seller) {
        seller.name = req.body.name || seller.name;
        seller.email = req.body.email || seller.email;

        const updatedSeller = await seller.save();
    
        res.json({
        _id: updatedSeller._id,
        name: updatedSeller.name,
        email: updatedSeller.email,
        });
    } else {
        res.status(404);
        throw new Error("Seller not found");
    }
    });

    export {
        getSellerById,
        getSellers,
        updateSeller,
    };