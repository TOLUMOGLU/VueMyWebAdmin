import axios from 'axios';

export const login = async (username, password) => {
  const response = await axios.post('http://localhost:5282/api/Auth/login', {
    username,
    password
  });
  return response.data;
};
