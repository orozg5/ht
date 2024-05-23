import axiosInstance from "axios";

const getShipmentTrackingByTrackingId = async (id: string) => {
  try {
    const response = await axiosInstance.get(`http://localhost:8017/shipmentTracking/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default getShipmentTrackingByTrackingId;