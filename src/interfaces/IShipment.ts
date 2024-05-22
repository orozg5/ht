import IAddress from "./IAddress";
import ICustomer from "./ICustomer";
import IOrder from "./IOrder";

export default interface IShipment {
  id?: string;
  carrier?: string;
  trackingCode?: string;
  carrierTrackingUrl?: string;
  trackingDate?: string;
  status?: string;
  statusChangeDate?: string;
  statusChangeReason?: string;
  weight?: number;
  estimatedDeliveryDate?: string;
  addressFrom?: IAddress;
  addressTo?: IAddress;
  order?: IOrder[];
  relatedCustomer?: ICustomer;
  createDate?: string;
}
