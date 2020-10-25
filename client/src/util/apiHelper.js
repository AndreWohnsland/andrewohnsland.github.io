import axios from 'axios';
import arrayBufferToBase64 from './binaryConverter';

const apiAddress = process.env.REACT_APP_API_ADDRESS;
const api = `${apiAddress}/api`;

const getAndGenerateImageDetails = async () => {
  const res = await axios.get(`${api}/image/all/details`);
  const start = [{ name: 'Select image', value: 'noId' }];
  const imgList = res.data.map((img) => {
    const suff = img.category !== undefined ? ` (${img.category})` : '';
    return {
      name: `${img.name}${suff}`,
      value: img._id,
    };
  });
  return [...start, ...imgList];
};

const getAllImageData = async (pictype) => {
  const { data } = await axios.get(`${api}/image/${pictype}`);
  const returnData = await data.map((obj) => {
    return {
      width: obj.width,
      height: obj.height,
      src: `data:image/jpeg;base64,${arrayBufferToBase64(obj.img.data.data)}`,
      title: obj.name,
    };
  });
  return returnData;
};

const postImage = (data) => {
  return axios.post(`${api}/image/add`, data, {
    withCredentials: true,
    validateStatus: () => true,
  });
};

const deleteImage = (imageId) => {
  return axios.delete(`${api}/image/delete/${imageId}`, {
    withCredentials: true,
    validateStatus: () => true,
  });
};

const loginUser = (username, password) => {
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

const getElementData = async (elementType, id) => {
  const { data } = await axios.get(`${api}/${elementType}/${id}`);
  return data;
};

const getElements = async (elementType) => {
  const { data } = await axios.get(`${api}/${elementType}`);
  return data;
};

const addElement = (dataToSend, elementType) => {
  return axios.post(`${api}/${elementType}/add`, dataToSend, {
    withCredentials: true,
    validateStatus: () => true,
  });
};

const updateElement = (dataToSend, elementType, elementId) => {
  return axios.post(`${api}/${elementType}/update/${elementId}`, dataToSend, {
    withCredentials: true,
    validateStatus: () => true,
  });
};

const updatePassword = (username, password, newPassword, repeatedPassword) => {
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

const getAuth = () => {
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
  getElements,
  addElement,
  updateElement,
  updatePassword,
  postImage,
  getAuth,
};
