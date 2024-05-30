import Shipment from "../components/features/Shipment";
import { GetServerSideProps } from "next";
import getEnums from "@/fetches/getEnums";
import getCarriers from "@/fetches/getCarriers";
import IProps from "@/interfaces/IProps";
import { useEffect, useState } from "react";
import IShipment from "@/interfaces/IShipment";
import getShipmentTrackingByTrackingId from "@/fetches/getShipmentTrackingByTrackingId";

export default function UpdateShipment({ status, carriers }: IProps) {
  const [shipment, setShipment] = useState<IShipment>({});

  useEffect(() => {
    const fetchShipmentTracking = async () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");

      if (id) {
        const res = await getShipmentTrackingByTrackingId(id);
        if (res.status === 200) {
          setShipment(res.data);
        }
      }
    };

    fetchShipmentTracking();
  }, []);

  return (
    <Shipment
      key={shipment.id || ""}
      flag={false}
      status={status}
      carriers={carriers}
      aShipment={shipment}
      aCustomer={shipment.relatedCustomer || {}}
      anAddressFrom={shipment.addressFrom || {}}
      anAddressTo={shipment.addressTo || {}}
      aOrder={shipment.order || []}
    />
  );
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const enums = await getEnums();
  const { status } = enums;
  const carriers = await getCarriers();

  return {
    props: {
      status,
      carriers,
    },
  };
};
