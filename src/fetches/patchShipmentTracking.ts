import IShipment from "@/interfaces/IShipment";
import axiosInstance from "axios";

const patchShipmentTracking = async (id: string, ShipmentTracking: IShipment) => {
  try {
    const response = await axiosInstance.patch(`http://localhost:8017/shipmentTracking/${id}`, ShipmentTracking, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default patchShipmentTracking;