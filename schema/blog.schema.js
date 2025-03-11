import "../lib/db";
import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

mongoose.models = {};

const BlogSchema = mongoose.model("Blog", blogSchema);

export default BlogSchema;
