import mongoose from 'mongoose';

const shopSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    shopDetails: {
      shopName: {
        type: String,
        required: true,
      },
      shopEmail: {
        type: String,
        required: true,
        unique: true,
      },
      shopAddress: {
        type: String,
        required: true,
      },
      shopPhone: {
        type: String,
        required: true,
        unique: true,
      },
      shopDescription: {
        type: String,
        required: true,
      }
    },
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model('Shop', shopSchema);

export default Shop;
