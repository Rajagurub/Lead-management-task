import mongoose from "mongoose";

const resignationSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    dateOfJoining: {
      type: Date,
      required: true,
    },

    dateOfRelieving: {
      type: Date,
      required: true,
    },

    noticePeriod: {
      type: Number, // in days
      required: true,
    },

    reasonOfLeaving: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Resignation = mongoose.model("Resignation", resignationSchema);

export default Resignation;