import axiosInstance from "axios";

const getShipmentTrackingByStatus = async (status: string) => {
  try {
    const response = await axiosInstance.get(`http://localhost:8017/shipmentTracking?status=${status}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default getShipmentTrackingByStatus;
