import { Document } from 'mongoose'

export interface IImage {
  name: string
  width: number
  height: number
  img: string
  category: string
  createdAt: Date
  modifiedAt: Date
}

export interface IImageModel extends IImage, Document {}
