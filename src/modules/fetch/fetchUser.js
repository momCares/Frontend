import axiosInstance from "../../libs/axios/axiosInstance";

export const getUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    // console.log("Updating user with data: ", userData); // Debugging
    const response = await axiosInstance.put(`/users/${userData.id}`, userData);
    // console.log("Data Updated");
    return response.data;
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default { getUser, updateUser };
