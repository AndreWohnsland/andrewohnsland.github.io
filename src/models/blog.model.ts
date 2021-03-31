import mongoose, { Model } from 'mongoose';
// @ts-expect-error: types conflicting with latest mongoose
import uniqueValidator from 'mongoose-unique-validator';
import { IBlogModel } from '../interfaces/blog.interface';
import { slugify } from './utils';

const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: { type: String, required: [true, 'Please enter a titel'], unique: [true, 'No duplicate title allowed'] },
    description: { type: String, required: [true, 'Please enter a description'] },
    text: { type: String, required: [true, 'Please enter a text'] },
    category: { type: [String], default: [] },
    draft: { type: Boolean, default: false },
    slug: { type: String, unique: [true, 'Slug of title is not unique'] },
  },
  { timestamps: true },
);

blogSchema.pre<IBlogModel>('save', function (next) {
  this.slug = slugify(this.title);
  next();
});

blogSchema.plugin(uniqueValidator);
const Blog: Model<IBlogModel> = mongoose.model('Blog', blogSchema);

export default Blog;
