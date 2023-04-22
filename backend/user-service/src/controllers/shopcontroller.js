import Shop from "../models/shopModel.js";
import asyncHandler from "express-async-handler";

// @desc    Fetch shop by id
// @route   GET /api/shops/:id
// @access  Public
const getshopById = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id);

  if (shop) {
    res.json(shop);
  } else {
    res.status(404);
    throw new Error("Shop not found");
  }
});

// @desc    Fetch all shops
// @route   GET /api/shops
// @access  Public
const getshops = asyncHandler(async (req, res) => {
  const shops = await Shop.find({});
  res.json(shops);
});

// @desc    Update a shop
// @route   PUT /api/shops/:id
// @access  Private/Admin
const updateshop = asyncHandler(async (req, res) => {
    const shop = await Shop.findById(req.params.id);
    
    if (shop) {
        shop.name = req.body.name || shop.name;
        shop.email = req.body.email || shop.email;

        const updatedshop = await shop.save();
    
        res.json({
        _id: updatedshop._id,
        name: updatedshop.name,
        email: updatedshop.email,
        });
    } else {
        res.status(404);
        throw new Error("Shop not found");
    }
    });

    export {
        getshopById,
        getshops,
        updateshop,
    };