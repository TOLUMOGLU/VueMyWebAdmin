import axios from 'axios';

const API_URL = 'http://localhost:5282/api/Education';

export const educationUpdate = async (id, educationData, token) => {
   const response = await axios.put(`${API_URL}/${id}`, educationData,{
    headers : {
      Authorization : `Bearer ${token}`
    }
  });
    return {data: response.data, status: response.status}
}
export const educationDelete = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`,{
    headers : {
      Authorization : `Bearer ${token}`
    }
  });
  return {data:response.data, status:response.status}
}

export const educationGetAll = async () => {
  const response = await axios.get(API_URL)
  return {data:response.data, status:response.status}
}

export const educationPost = async (payload, token) => {
  const response = await axios.post(API_URL, payload,{
    headers : {
      Authorization : `Bearer ${token}`
    }
  });
  return { data: response.data, status: response.status }
}