import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  return response.data;
};

const registerService = {
  register,
};

export default registerService;
