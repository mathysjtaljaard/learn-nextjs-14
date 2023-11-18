import mongoose from "mongoose";
import { Invoice, InvoiceSchema } from "./invoice.model";
const isEmail = require("validator/lib/isEmail");

export type BaseCustomer = {
  name: string;
  email: string;
  image_url: string;
};

export type CreateCustomer = BaseCustomer;
export type UpdateCustomer = BaseCustomer & {
  id: string;
};
export type Customer = UpdateCustomer;

interface ICustomers extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  image_url: string;
  // invoices: Array<Invoice>
}

export const CustomerSchema = new mongoose.Schema<ICustomers>(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: (value: string) => isEmail(value),
    },
    image_url: {
      type: String,
      required: true,
    },
    // invoices: [InvoiceSchema]
  },
  { timestamps: true }
);

export default mongoose.models.Customer ||
  mongoose.model<ICustomers>("Customer", CustomerSchema);
