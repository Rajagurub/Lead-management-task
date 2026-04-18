import mongoose from "mongoose";
const saleSchema = new mongoose.Schema({

  amount: {
    type: Number,
    required: true,
    min: 0
  },

  type: {
    type: String,
    enum: ["income", "expense"],
    required: true
  },

 
  date: {
    type: Date,
    default: Date.now,
    index: true
  }

}, {
  timestamps: true
});

const Sale = mongoose.model("Sale", saleSchema);

export default Sale;
