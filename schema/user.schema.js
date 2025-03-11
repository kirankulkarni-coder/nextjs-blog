import "../lib/db";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

mongoose.models = {};

userSchema.pre("save", async function (next) {
  console.log(this);
  const encrypted = await bcrypt.hash(this.password.toString(), 12);
  this.password = encrypted;
  next();
});

const UserSchema = mongoose.model("User", userSchema);

export default UserSchema;
