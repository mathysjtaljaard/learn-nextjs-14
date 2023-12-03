import mongoose, { Schema, Types } from "mongoose";

export type AInvoice = {
  id?: string;
  customer: string;
  amount: number;
  date?: Date;
  status: "pending" | "paid";
};

interface IInvoice extends mongoose.Document {
  id: string;
  date?: Date;
  amount: number;
  customer: Schema.Types.ObjectId; 
  status: "pending" | "paid";
  // customer: Customer
}

export const InvoiceSchema = new mongoose.Schema<IInvoice>(
  {
    id: {
      type: String,
      required: true,
    },
    customer: {
      type: Types.ObjectId,
      ref: 'Customer'
    },
    date: { type: Date, default: Date.now() },
    amount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "paid"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Invoice ||
  mongoose.model<IInvoice>("Invoice", InvoiceSchema);
