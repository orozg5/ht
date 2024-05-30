import IAddress from "./IAddress";
import ICarrier from "./ICarrier";
import ICustomer from "./ICustomer";
import IOrder from "./IOrder";
import IShipment from "./IShipment";

export default interface IShipmentProps {
  flag: boolean;
  status: { [key: string]: string };
  carriers: ICarrier[];
  aShipment: IShipment;
  aCustomer: ICustomer;
  anAddressFrom: IAddress;
  anAddressTo: IAddress;
  aOrder: IOrder[];
}
