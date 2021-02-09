import axios from 'axios';

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
      src: obj.img,
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

// For the new feature to differentiate between drafts and released posts
// drafts are only for the admin available and got the draft = true state
const getElementDataAsAdmin = async (elementType, id) => {
  const { data } = await axios.get(`${api}/${elementType}/admin/${id}`, {
    withCredentials: true,
    validateStatus: () => true,
  });
  return data;
};

const getElementsAsAdmin = async (elementType) => {
  const { data } = await axios.get(`${api}/${elementType}/admin`, {
    withCredentials: true,
    validateStatus: () => true,
  });
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
  getElementDataAsAdmin,
  getElements,
  getElementsAsAdmin,
  addElement,
  updateElement,
  updatePassword,
  postImage,
  getAuth,
};
