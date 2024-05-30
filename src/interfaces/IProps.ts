import ICarrier from "./ICarrier";

export default interface IProps {
  status: { [key: string]: string };
  carriers: ICarrier[];
}