import axios, { AxiosResponse } from 'axios'
import { IElement, IElementPost } from '../Interfaces/element.interface'
import {
  CompleteImageData,
  IImageElement,
  IImageReducedDetails,
} from '../Interfaces/image.interface'
import { IResource } from '../Interfaces/resource.interface'

const apiAddress = import.meta.env.VITE_APP_API_ADDRESS
const api = `${apiAddress}/api`

const credentialsOptions = {
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
}

const credentialsOptionsNoValidate = {
  ...credentialsOptions,
  validateStatus: () => true,
}

const credentialsOptionsFormData = {
  withCredentials: true,
  headers: { 'Content-Type': 'multipart/form-data' },
}

const credentialsOptionsNoValidateFormData = {
  ...credentialsOptionsFormData,
  validateStatus: () => true,
}

const getAndGenerateImageDetails = async (): Promise<
  IImageReducedDetails[]
> => {
  const res = await axios.get(`${api}/image/all/details`)
  const start = [{ name: 'Select Image', value: '' }]
  const imgList = res.data.map((img: IImageElement) => {
    const suff = img.category !== undefined ? ` (${img.category})` : ''
    return {
      name: `${img.name}${suff}`,
      value: img._id,
    }
  })
  return [...start, ...imgList]
}

const getAllImageData = async (
  pictype: string,
): Promise<CompleteImageData[]> => {
  const { data } = await axios.get(`${api}/image/${pictype}`)
  let returnData = await data.map((obj: IImageElement) => {
    return {
      width: obj.width,
      height: obj.height,
      src: obj.img,
      title: obj.name,
    }
  })
  returnData = returnData.sort(() => Math.random() - 0.5)
  return returnData
}

const postImage = (data: FormData): Promise<AxiosResponse> => {
  return axios.post(
    `${api}/image/add`,
    data,
    credentialsOptionsNoValidateFormData,
  )
}

const deleteImage = (imageId: string): Promise<AxiosResponse> => {
  return axios.delete(
    `${api}/image/delete/${imageId}`,
    credentialsOptionsNoValidate,
  )
}

const loginUser = (
  username: string,
  password: string,
): Promise<AxiosResponse> => {
  return axios.post(
    `${api}/user/login`,
    { username, password },
    credentialsOptionsNoValidate,
  )
}

const getElementData = async (
  elementType: string,
  slug: string,
): Promise<IElement> => {
  const { data } = await axios.get(
    `${api}/${elementType}/${slug}`,
    credentialsOptions,
  )
  return data
}

const getElements = async (
  elementType: string,
  getText = false,
): Promise<IElement[]> => {
  const textQuery = getText ? '?text=1' : ''
  const { data } = await axios.get(
    `${api}/${elementType}${textQuery}`,
    credentialsOptions,
  )
  return data
}

const addElement = (
  dataToSend: IElementPost,
  elementType: string,
): Promise<AxiosResponse> => {
  return axios.post(`${api}/${elementType}/add`, dataToSend, credentialsOptions)
}

const updateElement = (
  dataToSend: IElementPost,
  elementType: string,
  elementId: string,
): Promise<AxiosResponse> => {
  return axios.post(
    `${api}/${elementType}/update/${elementId}`,
    dataToSend,
    credentialsOptionsNoValidate,
  )
}

const deleteElement = (
  elementType: string,
  elementId: string,
): Promise<AxiosResponse> => {
  return axios.delete(
    `${api}/${elementType}/${elementId}`,
    credentialsOptionsNoValidate,
  )
}

const updatePassword = (
  username: string,
  password: string,
  newPassword: string,
  repeatedPassword: string,
): Promise<AxiosResponse> => {
  return axios.post(
    `${api}/user/change`,
    { username, password, newPassword, repeatedPassword },
    credentialsOptionsNoValidate,
  )
}

const getAllCategories = async (categorySection: string): Promise<string[]> => {
  try {
    const { data } = await axios.get(`${api}/category/${categorySection}`)
    if (data === undefined) {
      return []
    }
    return data
  } catch {
    return []
  }
}

const getAuth = (): Promise<boolean> => {
  return axios
    .get(`${api}/user/auth`, credentialsOptions)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

const logoutUser = (): Promise<boolean> => {
  return axios
    .post(`${api}/user/logout`, {}, credentialsOptions)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

const postResource = async (data: FormData): Promise<AxiosResponse> => {
  return axios.post(`${api}/resource`, data, credentialsOptionsFormData)
}

const getResources = async (): Promise<IResource[]> => {
  const { data } = await axios.get(`${api}/resource`, credentialsOptions)
  return data
}

const deleteResource = async (resourceId: string): Promise<AxiosResponse> => {
  return axios.delete(`${api}/resource/${resourceId}`, credentialsOptions)
}

export {
  getAndGenerateImageDetails,
  deleteImage,
  getAllImageData,
  loginUser,
  logoutUser,
  getElementData,
  getElements,
  addElement,
  updateElement,
  deleteElement,
  updatePassword,
  postImage,
  getAuth,
  getAllCategories,
  postResource,
  getResources,
  deleteResource,
}
