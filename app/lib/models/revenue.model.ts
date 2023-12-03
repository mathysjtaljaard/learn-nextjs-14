import mongoose from "mongoose";
const isEmail = require("validator/lib/isEmail");

export type ARevenue = {
  id?: string;
  month: string;
  revenue: number;
};


interface IRevenue extends mongoose.Document {
  id: string;
  month: string;
  revenue: number;
}

const RevenueSchema = new mongoose.Schema<IRevenue>(
  {
    id: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    revenue: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Revenue ||
  mongoose.model<IRevenue>("Revenue", RevenueSchema);
