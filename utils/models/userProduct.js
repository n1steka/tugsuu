import mongoose from "mongoose";

const userProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  orderCount: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserProduct =
  mongoose.models.UserProduct ||
  mongoose.model("UserProduct", userProductSchema);

export default UserProduct;
