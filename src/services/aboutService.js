import axios from 'axios';

const API_URL = 'http://localhost:5282/api/About';


export const aboutUpdate = async (id, aboutData) => {
  const response = await axios.put(`${API_URL}/${id}`, aboutData)
  return response.data
}

export const aboutDelete = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return response.data
}

export const aboutGetAll = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

