import axios from 'axios';

const API_URL = 'http://localhost:5282/api/About';

export const aboutUpdate = async (id, aboutData, token) => {
  const response = await axios.put(`${API_URL}/${id}`, aboutData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return { data: response.data, status: response.status };
};


export const aboutDelete = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return {data:response.data, status:response.status}
}

export const aboutGetAll = async () => {
  const response = await axios.get(API_URL)
  return {data:response.data, status:response.status}
}


