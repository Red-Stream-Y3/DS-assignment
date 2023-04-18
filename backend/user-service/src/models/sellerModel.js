import mongoose from "mongoose";

const sellerSchema = mongoose.Schema(
    {
        sellerName: {
            type: String,
            required: true,
        }, 
        sellerEmail: {
            type: String,
            required: true,
            unique: true,
        },
        sellerAddress: {
            type: String,
            required: true,
        },
        sellerPhone: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;