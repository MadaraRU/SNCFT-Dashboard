import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

// Get users
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// // Delete user
// const deleteUser = async (userId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.delete(API_URL + userId, config);

//   return response.data;
// };
// Delete user
const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + userId, "", config);

  return response.data;
};

// Get user profile

const getUserProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    "http://localhost:5000/api/users/profile",
    config
  );

  return response.data;
};

// Update user Profile

const updateUserProfile = async (user, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    "http://localhost:5000/api/users/profile",
    user,
    config
  );

  return response.data;
};

const usersService = {
  getUsers,
  deleteUser,
  getUserProfile,
  updateUserProfile,
};

export default usersService;
