import axios from 'axios';

const API_URL = 'http://localhost:5282/api/Project';


export const projectUpdate = async (id, projectData) => {
  const response = await axios.put(`${API_URL}/${id}`, projectData)

  return {data:response.data, status:response.status}

}

export const projectPost = async (newData) => {
  const response = await axios.post(API_URL, newData)
  return {data: response.data, status: response.status}
 
}

export const projectDelete = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return {data:response.data, status:response.status}
}

export const projectGetAll = async () => {
  const response = await axios.get(API_URL)
  return {data:response.data, status:response.status}
}

