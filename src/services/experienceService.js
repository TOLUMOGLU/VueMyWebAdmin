import axios from 'axios';

const API_URL = 'http://localhost:5282/api/Experience';

export const experienceUpdate = async (id, experienceData) => {
   const response = await axios.put(`${API_URL}/${id}`, experienceData)
    return {data: response.data, status: response.status}
}
export const experienceDelete = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return {data:response.data, status:response.status}
}

export const experienceGetAll = async () => {
  const response = await axios.get(API_URL)
  return {data:response.data, status:response.status}
}

export const experiencePost = async (payload) => {
  const response = await axios.post(API_URL, payload)
  return { data: response.data, status: response.status }
}

