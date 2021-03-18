import axios, { AxiosResponse } from 'axios';
import { IElement } from '../Interfaces/element.interface';
import {
  IImageElement,
  IImageReducedDetails,
} from '../Interfaces/image.interface';

const apiAddress = process.env.REACT_APP_API_ADDRESS;
const api = `${apiAddress}/api`;

const getAndGenerateImageDetails = async (): Promise<
  IImageReducedDetails[]
> => {
  const res = await axios.get(`${api}/image/all/details`);
  const start = [{ name: 'Select image', value: 'noId' }];
  const imgList = res.data.map((img: IImageElement) => {
    const suff = img.category !== undefined ? ` (${img.category})` : '';
    return {
      name: `${img.name}${suff}`,
      value: img._id,
    };
  });
  return [...start, ...imgList];
};

type CompleteImageData = {
  width: number;
  height: number;
  src: string;
  title: string;
};

const getAllImageData = async (
  pictype: string
): Promise<CompleteImageData[]> => {
  const { data } = await axios.get(`${api}/image/${pictype}`);
  const returnData = await data.map((obj: IImageElement) => {
    return {
      width: obj.width,
      height: obj.height,
      src: obj.img,
      title: obj.name,
    };
  });
  return returnData;
};

const postImage = (data: FormData): Promise<AxiosResponse> => {
  return axios.post(`${api}/image/add`, data, {
    withCredentials: true,
    validateStatus: () => true,
  });
};

const deleteImage = (imageId: string): Promise<AxiosResponse> => {
  return axios.delete(`${api}/image/delete/${imageId}`, {
    withCredentials: true,
    validateStatus: () => true,
  });
};

const loginUser = (
  username: string,
  password: string
): Promise<AxiosResponse> => {
  return axios.post(
    `${api}/user/login`,
    { username, password },
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      validateStatus: () => true,
    }
  );
};

const getElementData = async (
  elementType: string,
  id: string
): Promise<IElement> => {
  const { data } = await axios.get(`${api}/${elementType}/${id}`);
  return data;
};

const getElements = async (elementType: string): Promise<IElement[]> => {
  const { data } = await axios.get(`${api}/${elementType}`);
  return data;
};

// For the new feature to differentiate between drafts and released posts
// drafts are only for the admin available and got the draft = true state
const getElementDataAsAdmin = async (
  elementType: string,
  id: string
): Promise<IElement> => {
  const { data } = await axios.get(`${api}/${elementType}/admin/${id}`, {
    withCredentials: true,
    validateStatus: () => true,
  });
  return data;
};

const getElementsAsAdmin = async (elementType: string): Promise<IElement[]> => {
  const { data } = await axios.get(`${api}/${elementType}/admin`, {
    withCredentials: true,
    validateStatus: () => true,
  });
  return data;
};

type SendElement = {
  elementId: string | undefined;
  title: string;
  description: string;
  text: string;
  link: string | undefined;
  draft: boolean;
};

const addElement = (
  dataToSend: SendElement,
  elementType: string
): Promise<AxiosResponse> => {
  return axios.post(`${api}/${elementType}/add`, dataToSend, {
    withCredentials: true,
    validateStatus: () => true,
  });
};

const updateElement = (
  dataToSend: SendElement,
  elementType: string,
  elementId: string
): Promise<AxiosResponse> => {
  return axios.post(`${api}/${elementType}/update/${elementId}`, dataToSend, {
    withCredentials: true,
    validateStatus: () => true,
  });
};

const updatePassword = (
  username: string,
  password: string,
  newPassword: string,
  repeatedPassword: string
): Promise<AxiosResponse> => {
  return axios.post(
    `${api}/user/change`,
    { username, password, newPassword, repeatedPassword },
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      validateStatus: () => true,
    }
  );
};

const getAuth = (): Promise<boolean> => {
  return axios
    .get(`${api}/user/auth`, {
      withCredentials: true,
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

export {
  getAndGenerateImageDetails,
  deleteImage,
  getAllImageData,
  loginUser,
  getElementData,
  getElementDataAsAdmin,
  getElements,
  getElementsAsAdmin,
  addElement,
  updateElement,
  updatePassword,
  postImage,
  getAuth,
};
