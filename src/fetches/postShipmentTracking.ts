import IShipment from "@/interfaces/IShipment";
import axiosInstance from "axios";

const postShipmentTracking = async (ShipmentTracking: IShipment) => {
  try {
    const response = await axiosInstance.post("http://localhost:8017/shipmentTracking", ShipmentTracking, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default postShipmentTracking;
