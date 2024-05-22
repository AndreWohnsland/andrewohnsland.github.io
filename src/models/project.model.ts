import mongoose from 'mongoose'
// @ts-expect-error: types conflicting with latest mongoose
import uniqueValidator from 'mongoose-unique-validator'
import { IProjectModel } from '../interfaces/project.interface'
import { slugify } from './utils'

const { Schema } = mongoose

const projectSchema = new Schema<IProjectModel>(
  {
    title: {
      type: String,
      required: [true, 'Please enter a titel'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please enter a description'],
    },
    text: { type: String, required: [true, 'Please enter a text'] },
    category: { type: [String], default: [] },
    link: { type: String, required: [true, 'Please enter a link'] },
    draft: { type: Boolean, default: false },
    slug: { type: String, unique: true },
  },
  { timestamps: true },
)

projectSchema.pre<IProjectModel>('save', function (next) {
  this.slug = slugify(this.title)
  next()
})

projectSchema.plugin(uniqueValidator)
const Project = mongoose.model<IProjectModel>('Project', projectSchema)

export default Project
