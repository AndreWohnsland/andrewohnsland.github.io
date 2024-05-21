export interface IImageElement {
  _id: string
  width: number
  height: number
  img: string
  name: string
  category: string
}

export interface IImageReducedDetails {
  name: string
  value: string
}

export type CompleteImageData = {
  width: number
  height: number
  src: string
  title: string
}
