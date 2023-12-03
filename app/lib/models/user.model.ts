import mongoose from "mongoose";
const isEmail = require("validator/lib/isEmail");

export type AUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

interface IUsers extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<IUsers>(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      validate: (value: string) => isEmail(value),
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 20,
      maxlength: 254,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUsers>("User", UserSchema);
