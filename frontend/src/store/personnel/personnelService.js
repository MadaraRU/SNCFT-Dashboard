import axios from "axios";

const getPersonnel = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    "http://localhost:5000/api/personnel",
    config
  );

  return response.data;
};

const personnelService = {
  getPersonnel,
};

export default personnelService;
