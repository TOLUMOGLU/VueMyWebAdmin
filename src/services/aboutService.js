import axios from 'axios';

const API_URL = 'http://localhost:5282/api/About';
const backendBaseUrl = 'http://localhost:5282';

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

export async function uploadImageFile(file) {
  const formData = new FormData();
  formData.append('file', file);  

  const response = await fetch(backendBaseUrl + '/api/About/upload-image', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Dosya yüklenemedi');
  }

  const data = await response.json();
  return data.imageUrl;  
}

