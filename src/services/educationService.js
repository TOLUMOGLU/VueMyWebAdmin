import axios from 'axios';

const API_URL = 'http://localhost:5282/api/Education';

export const educationUpdate = async (id, educationData) => {
   const response = await axios.put(`${API_URL}/${id}`, educationData)
    return {data: response.data, status: response.status}
}
export const educationDelete = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return {data:response.data, status:response.status}
}

export const educationGetAll = async () => {
  const response = await axios.get(API_URL)
  return {data:response.data, status:response.status}
}