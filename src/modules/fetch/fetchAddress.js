import axiosInstance from "@/libs/axios/axiosInstance";

export const findAllAddress = async () => {
  try {
    const response = await axiosInstance.get("/address");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching address data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const findOneAddress = async (id) => {
  try {
    const response = await axiosInstance.get(`/address/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching address data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const createAddress = async (data) => {
  try {
    const response = await axiosInstance.post("/address", data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating address:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const updateAddress = async (id, data) => {
  try {
    const updatedData = {
      ...data,
      province_id: data.province,
    };

    const response = await axiosInstance.put(`/address/${id}`, updatedData);

    return response.data;
  } catch (error) {
    console.error("Error updating address:");
    console.error("Error message:", error.message);
    console.error("Error stack trace:", error.stack);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
      console.error("Response headers:", error.response.headers);
    }
    throw error;
  }
};

export const destroyAddress = async (id) => {
  try {
    const response = await axiosInstance.delete(`/address/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting address:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default {
  findAllAddress,
  findOneAddress,
  createAddress,
  updateAddress,
  destroyAddress,
};
