import axiosInstance from "axios";

const getShipmentTracking = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `http://localhost:8017/shipmentTracking?relatedCustomer.customerId=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export default getShipmentTracking;
