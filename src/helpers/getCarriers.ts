import axiosInstance from "axios";

const getCarriers = async () => {
  try {
    const response = await axiosInstance.get(`http://localhost:8017/carrier`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getCarriers;
