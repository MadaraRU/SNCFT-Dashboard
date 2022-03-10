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

// add parc
const addParc = async (parc, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, parc, config);

  return response.data;
};

// update parc

const updateParc = async ({ parcId, parc }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `http://localhost:5000/api/parc/${parcId}`,
    parc,
    config
  );

  return response.data;
};

// delete parc
const deleteParc = async (parcId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + parcId, config);

  return response.data;
};

// getParcCars
const getCars = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `http://localhost:5000/api/parc/${id}/cars`,
    config
  );

  return response.data;
};

const parcService = {
  getParc,
  getCars,
  addParc,
  updateParc,
  deleteParc,
};

export default parcService;
