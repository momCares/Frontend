import axiosInstance from "@/libs/axios/axiosInstance";

export const findAllCity = async (search) => {
  try {
    console.log("Sending request to /cities");
    const response = await axiosInstance.get(
      `/cities?search=${search}&limit=5`
    );
    console.log("response received: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching city data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const findOneCity = async (id) => {
  try {
    const response = await axiosInstance.get(`/cities/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching city data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default { findAllCity, findOneCity };
