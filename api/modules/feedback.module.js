import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    foodMenu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodMenu",
      required: true,
    },
  },
  { timestamps: true }
);

const feedback = mongoose.model("feedback", feedbackSchema);

export default feedbackSchema;
