import { GetServerSideProps } from "next";
import Shipment from "../components/features/Shipment";
import getEnums from "@/fetches/getEnums";
import getCarriers from "@/fetches/getCarriers";
import IProps from "@/interfaces/IProps";

export default function NewShipment({ status, carriers }: IProps) {
  return (
    <Shipment
      flag={true}
      status={status}
      carriers={carriers}
      aShipment={{}}
      aCustomer={{}}
      anAddressFrom={{}}
      anAddressTo={{}}
      aOrder={[]}
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
