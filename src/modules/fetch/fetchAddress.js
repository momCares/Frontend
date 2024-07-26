import axiosInstance from "@/libs/axios/axiosInstance";

export const findAllAddress = async () => {
  try {
    // console.log("Sending request to /addresses");
    const response = await axiosInstance.get("/address");
    // console.log("response received: ", response.data);
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
    // console.log("Finding Address id ...");
    const response = await axiosInstance.get(`/address/${id}`);
    // console.log("Data Found: ", response.data);
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
    // console.log("Sending request to /addresses");
    // console.log(data, "<<<<DATA");
    const response = await axiosInstance.post("/address", data);
    // console.log("response received: ", response.data);
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

    //   console.log("Sending request to /address/" + id);
    //   console.log("Request data:", updatedData);

    const response = await axiosInstance.put(`/address/${id}`, updatedData);

    //   console.log("Response status:", response.status);
    //   console.log("Response data:", response.data);

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
