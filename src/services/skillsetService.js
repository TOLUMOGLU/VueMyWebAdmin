import axios from "axios";

const API_URL = 'http://localhost:5282/api/Skillset';

export const skillsetUpdate = async (id, skillsetData) => {
   const response = await axios.put(`${API_URL}/${id}`, skillsetData)
    return {data: response.data, status: response.status}
}
export const skillsetDelete = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return {data:response.data, status:response.status}
}

export const skillsetGetAll = async () => {
  const response = await axios.get(API_URL)
  return {data:response.data, status:response.status}
}