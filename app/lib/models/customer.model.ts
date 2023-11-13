import mongoose from "mongoose";
const isEmail = require("validator/lib/isEmail");
const isUrl = require("validator/lib/isURL");

type BaseCustomer = {
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
  },
  { timestamps: true }
);

export default mongoose.models.Customer ||
  mongoose.model<ICustomers>("Customer", CustomerSchema);
