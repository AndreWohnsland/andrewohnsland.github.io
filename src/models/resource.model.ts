import mongoose from 'mongoose'
import { IResourceModel } from '../interfaces/resource.interface'

const { Schema } = mongoose

const resourceSchema = new Schema<IResourceModel>(
  {
    name: { type: String, required: [true, 'Please enter a title'] },
    filename: { type: String, required: [true, 'Please enter a filename'] },
    blogId: { type: String, required: [true, 'Please reference a blog'] },
    link: { type: String, required: [true, 'Please enter a link'] },
  },
  { timestamps: true },
)

const Resource = mongoose.model<IResourceModel>('Resource', resourceSchema)

export default Resource
