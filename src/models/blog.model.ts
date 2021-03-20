import mongoose, { Model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IBlogModel } from '../interfaces/blog.interface';

const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: { type: String, required: [true, 'Please enter a titel'], unique: [true, 'No duplicate title allowed'] },
    description: { type: String, required: [true, 'Please enter a description'] },
    text: { type: String, required: [true, 'Please enter a text'] },
    draft: { type: Boolean, default: false },
  },
  { timestamps: true },
);

blogSchema.plugin(uniqueValidator);
const Blog: Model<IBlogModel> = mongoose.model('Blog', blogSchema);

export default Blog;
