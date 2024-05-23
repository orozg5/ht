import { GetServerSideProps } from "next";
import Shipment from "../components/features/Shipment";
import getEnums from "@/helpers/getEnums";
import getCarriers from "@/helpers/getCarriers";
import IProps from "@/interfaces/IProps";

export default function NewShipment({ status, carriers }: IProps) {
  return (
    <Shipment
      key={""}
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
