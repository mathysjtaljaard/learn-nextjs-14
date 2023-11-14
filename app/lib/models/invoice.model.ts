import mongoose, { Schema, Types } from "mongoose";

export type BaseInvoice = {
  customer_id: string;
  amount: number;
  date: string;
  status: "pending" | "paid";
};

export type CreateInvoice = BaseInvoice;
export type UpdateInvoice = BaseInvoice & {
  id: string;
};

interface IInvoice extends mongoose.Document {
  id: string;
  customer_id: string;
  date: Date;
  amount: number;
  // customer: Types.ObjectId; TODO: how to use subdocuments
  status: "pending" | "paid";
}

const InvoiceSchema = new mongoose.Schema<IInvoice>(
  {
    id: {
      type: String,
      required: true,
    },
    customer_id: {
      type: String,
      required: true,
    },
    // customer: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Customer'
    // },
    date: { type: Date, required: true },
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
