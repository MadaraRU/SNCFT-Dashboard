import axios from "axios";

const API_URL = "http://localhost:5000/api/parc/";

const getCars = async (parcId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(
    "http://localhost:5000/api/parc/" + parcId + "/cars/",
    config
  );

  return response.data;
};

const deleteCar = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    `http://localhost:5000/api/voiture/${id}`,
    config
  );

  return response.data;
};

const carsServiceP = {
  getCars,
  deleteCar,
};

export default carsServiceP;
