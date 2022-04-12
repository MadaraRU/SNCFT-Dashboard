import axios from "axios";

const getHistory = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("http://localhost:5000/api/archive", config);

  return response.data;
};

const archiveService = {
  getHistory,
};

export default archiveService;
