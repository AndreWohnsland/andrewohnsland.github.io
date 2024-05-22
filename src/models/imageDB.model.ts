import mongoose from 'mongoose'
import { IImageModel } from '../interfaces/image.interface'

const { Schema } = mongoose

const imageSchema = new Schema<IImageModel>(
  {
    name: { type: String, required: [true, 'Please enter a name'] },
    width: Number,
    height: Number,
    img: { type: String, required: [true, 'Please enter a img url'] },
    category: String,
  },
  { timestamps: true },
)

const Image = mongoose.model<IImageModel>('ImageDB', imageSchema)

export default Image
