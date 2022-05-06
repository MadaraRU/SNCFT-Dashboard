import axios from "axios";

const getCarDamagedDetails = async (carId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(
    "http://localhost:5000/api/voiture/" + carId + "/damaged/",
    config
  );

  return response.data;
};

const damagedCService = {
  getCarDamagedDetails,
};

export default damagedCService;
