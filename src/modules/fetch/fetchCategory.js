import { axiosInstance } from "@/libs/axios/axiosInstance";

export const findAll = async () => {
  try {
    const response = await axiosInstance.get("/cities");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching category data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const findOne = async (id) => {
  try {
    const response = await axiosInstance.get(`/cities/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching category data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default { findAll, findOne };
