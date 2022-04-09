import axios from "axios";

const getPapers = async (carId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(
    "http://localhost:5000/api/voiture/" + carId + "/papers/",
    config
  );

  return response.data;
};

const papersServiceC = {
  getPapers,
};

export default papersServiceC;
