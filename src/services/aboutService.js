import axios from 'axios';

const API_URL = 'http://localhost:5282/api/About';


export const aboutUpdate = async (id, aboutData) => {
  const response = await axios.put(`${API_URL}/${id}`, aboutData)

  return {data:response.data, status:response.status}

}

export const aboutDelete = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return {data:response.data, status:response.status}
}

export const aboutGetAll = async () => {
  const response = await axios.get(API_URL)
  return {data:response.data, status:response.status}
}

export const uploadBase64Image = async (base64String) => {
  const response = await axios.post(
    'http://localhost:5282/api/About/upload-base64',
    { base64Image: base64String }
  );

  return response.data.imageUrl; // örneğin "/uploads/upload_123abc.jpg"
};

