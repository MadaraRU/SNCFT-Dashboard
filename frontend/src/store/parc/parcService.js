import axios from "axios";

const API_URL = "http://localhost:5000/api/parc/";

// get parc
const getParc = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const parcService = {
  getParc,
};

export default parcService;
