import axios from 'axios';

const api_address = process.env.REACT_APP_API_ADDRESS;

const getAndGenerateImageDetails = async () => {
  const res = await axios.get(`${api_address}/api/image/all/details`);
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

const deleteImage = (imageId) => {
  return axios.delete(`${api_address}/api/image/delete/${imageId}`, {
    withCredentials: true,
    validateStatus: () => true,
  });
};

const loginUser = (username, password) => {
  return axios.post(
    `${api_address}/api/user/login`,
    { username, password },
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      validateStatus: () => true,
    }
  );
};

export { getAndGenerateImageDetails, deleteImage, loginUser };
