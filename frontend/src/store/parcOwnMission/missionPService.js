import axios from "axios";

const API_URL = "http://localhost:5000/api/parc/";

const getMissions = async (parcId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(
    "http://localhost:5000/api/parc/" + parcId + "/mission/",
    config
  );

  return response.data;
};
// const addMission = async (mission, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.post(
//     "http://localhost:5000/api/mission/",
//     mission,
//     config
//   );

//   return response.data;
// };

// const updateMissionToFini = async (missionId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.put(
//     `http://localhost:5000/api/mission/${missionId}/fini`,
//     config
//   );

//   return response.data;
// };

const missionService = {
  getMissions,
  //   addMission,
  // updateMissionToFini,
};

export default missionService;
