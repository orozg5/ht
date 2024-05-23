import axiosInstance from "axios";

const getEnums = async () => {
  try {
    const response = await axiosInstance.get(`http://localhost:8017/enums`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getEnums;
