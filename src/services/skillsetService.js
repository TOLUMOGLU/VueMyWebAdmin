import axios from "axios";

const API_URL = 'http://localhost:5282/api/Skillset';

export const skillsetUpdate = async (id, skillsetData, token) => {
   const response = await axios.put(`${API_URL}/${id}`, skillsetData,{
    headers :{
      Authorization: `Bearer ${token}`
    }
  });
    return {data: response.data, status: response.status}
}
export const skillsetDelete = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`,{
    headers :{
      Authorization: `Bearer ${token}`
    }
  });
  return {data:response.data, status:response.status}
}

export const skillsetGetAll = async () => {
  const response = await axios.get(API_URL)
  return {data:response.data, status:response.status}
}

export const skillsetPost = async (data, token) => {
  const response = await axios.post(API_URL, data,{
    headers :{
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}; 