import mongoose, { Schema, Types } from "mongoose";

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

interface ICustomers extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  image_url: string;
  // invoices: Types.ObjectId; TODO: How to use subdocuments
}

const CustomerSchema = new mongoose.Schema<ICustomers>(
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
    // invoices: {
    //   type: Schema.Types.ObjectId, ref: 'Invoice'
    // }
  },
  { timestamps: true }
);

export default mongoose.models.Customer ||
  mongoose.model<ICustomers>("Customer", CustomerSchema);
