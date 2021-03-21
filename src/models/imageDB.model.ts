import mongoose, { Model } from 'mongoose';
import { IImageModel } from '../interfaces/image.interface';

const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    name: { type: String, required: [true, 'Please enter a name'] },
    width: Number,
    height: Number,
    img: { type: String, required: [true, 'Please enter a img url'] },
    category: String,
  },
  { timestamps: true },
);

const Image: Model<IImageModel> = mongoose.model<IImageModel>('ImageDB', imageSchema);

export default Image;
