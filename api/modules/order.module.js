import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderDate: {
            type: Date,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        foodMenus: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "FoodMenu",
            },
        ],
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

