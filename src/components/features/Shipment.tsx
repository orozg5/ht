import Footer from "@/components/shared/Fotter";
import Header from "@/components/shared/Header";
import patchShipmentTracking from "@/fetches/patchShipmentTracking";
import postShipmentTracking from "@/fetches/postShipmentTracking";
import IAddress from "@/interfaces/IAddress";
import ICarrier from "@/interfaces/ICarrier";
import ICustomer from "@/interfaces/ICustomer";
import IOrder from "@/interfaces/IOrder";
import IShipment from "@/interfaces/IShipment";
import IShipmentProps from "@/interfaces/IShipmentProps";
import { Box, Button, Divider, Flex, Heading, Input, Select, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";

export default function Shipment({
  flag,
  status,
  carriers,
  aShipment,
  aCustomer,
  anAddressFrom,
  anAddressTo,
  aOrder,
}: IShipmentProps) {
  const [error, setError] = useState<boolean>(false);
  const [shipment, setShipment] = useState<IShipment>(aShipment);
  const [customer, setCustomer] = useState<ICustomer>(aCustomer);
  const [addressFrom, setAddressFrom] = useState<IAddress>(anAddressFrom);
  const [addressTo, setAddressTo] = useState<IAddress>(anAddressTo);
  const [order, setOrder] = useState<IOrder[]>(aOrder);
  const [initialStatus, setInitialStatus] = useState({
    status: shipment.status,
    statusChangeReason: shipment.statusChangeReason,
  });

  const addOrder = () => {
    const orders = [...order, {}];
    setOrder(orders);
  };

  const removeOrder = (index: number) => {
    const updatedOrders = order.filter((o, i) => index !== i);
    setOrder(updatedOrders);
  };

  const handleChangeOrder = (index: number, field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedOrders = [...order];
    if (updatedOrders[index]) {
      updatedOrders[index] = {
        ...updatedOrders[index],
        [field]: e.target.value,
      };
      setOrder(updatedOrders);
    }
  };

  const isAddressEmpty = (a: IAddress | undefined) => {
    if (!a?.streetNr || !a?.streetName || !a?.streetSuffix || !a?.postcode || !a?.city || !a?.country) {
      setError(true);
      return true;
    }
  };

  const isEmpty = (ship: IShipment) => {
    if (!flag && (!ship.status || !ship.statusChangeReason)) {
      setError(true);
      return true;
    }
    if (
      !ship.carrier ||
      !ship.weight ||
      !ship.estimatedDeliveryDate ||
      !ship?.relatedCustomer?.name ||
      !ship?.relatedCustomer?.description ||
      !order.length
    ) {
      setError(true);
      return true;
    }
    if (isAddressEmpty(ship.addressFrom)) {
      return true;
    }
    if (isAddressEmpty(ship.addressTo)) {
      return true;
    }
    if (ship.order) {
      for (let o of ship.order) {
        if (!o.name || !o.referredType) {
          setError(true);
          return true;
        }
      }
    }
    setError(false);
    return false;
  };

  const handleSubmit = async () => {
    setError(false);
    let ship: IShipment = {
      status: shipment.status,
      statusChangeReason: shipment.statusChangeReason,
      carrier: shipment.carrier,
      weight: shipment.weight,
      estimatedDeliveryDate: shipment.estimatedDeliveryDate,
      addressFrom: addressFrom,
      addressTo: addressTo,
      order: order,
      relatedCustomer: customer,
    };
    const err = isEmpty(ship);

    const date = new Date().toLocaleString();
    if (!err) {
      if (flag) {
        const customerId = uuidv4();
        const orders = ship.order?.map((o: IOrder) => {
          const orderId = uuidv4();
          return {
            ...o,
            id: orderId,
            href: `/order/${orderId}`,
          };
        });

        ship = {
          ...ship,
          id: uuidv4(),
          trackingCode: `HR${uuidv4().replace(/-/g, "").substring(0, 10)}`,
          carrierTrackingUrl: carriers.filter((c) => c.id == shipment.carrier)[0].url,
          trackingDate: date,
          status: "initialized",
          statusChangeReason: "Naručeno",
          statusChangeDate: date,
          createDate: date,
          order: orders,
          relatedCustomer: {
            ...ship.relatedCustomer,
            customerId: customerId,
            href: `/user/${customerId}`,
          },
        };

        const res = await postShipmentTracking(ship);
        if (res.status === 201) {
          window.location.href = "/";
        }
      } else {
        if (shipment.id) {
          const orders = ship.order?.map((o: IOrder) => {
            if (!o.id) {
              const orderId = uuidv4();
              return {
                ...o,
                id: orderId,
                href: `http://localhost:3000/order/${orderId}`,
              };
            } else {
              return o;
            }
          });

          ship = {
            ...ship,
            order: orders,
            carrierTrackingUrl: carriers.filter((c) => c.id == shipment.carrier)[0].url
          };

          if (initialStatus.status != ship.status || initialStatus.statusChangeReason != ship.statusChangeReason) {
            ship = {
              ...ship,
              statusChangeDate: date,
            };
          }

          const res = await patchShipmentTracking(shipment.id, ship);
          if (res.status === 200) {
            window.location.href = "/";
          }
        }
      }
    }
  };

  return (
    <>
      <Header />
      <Flex mt="32px" direction="column" align="center">
        <Heading size="lg" color="#E20074" p="16px">
          {flag ? "Kreiraj novu" : "Uredi"} dostavu
        </Heading>

        <Flex gap="32px" mt="32px" direction={{ base: "column", lg: "row" }}>
          <Box>
            <Heading textAlign="center" size="md" color="#E20074">
              Dostavljač
            </Heading>
            <Text mt="8px">
              Naziv dostavljača
            </Text>

            <Select
              value={shipment.carrier}
              w={{ base: "300px", sm: "400px" }}
              borderColor="#A4A4A4"
              _hover={{ borderColor: "#E20074" }}
              focusBorderColor="#E20074"
              placeholder="Odaberite dostavljača"
              onChange={(e) => setShipment({ ...shipment, carrier: e.target.value })}
            >
              {carriers?.map((c: ICarrier) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>

            <Text mt="8px">
              Procijenjeni datum isporuke
            </Text>
            <Input
              value={shipment.estimatedDeliveryDate}
              type="datetime-local"
              onChange={(e) => setShipment({ ...shipment, estimatedDeliveryDate: e.target.value })}
            />

            <Text mt="8px">
              Težina (kg)
            </Text>
            <Input
              value={shipment.weight}
              type="number"
              placeholder="Upišite težinu narudžbe"
              onChange={(e) => setShipment({ ...shipment, weight: Number(e.target.value) })}
            />
          </Box>

          <Box>
            <Heading textAlign="center" size="md" color="#E20074">
              Kupac
            </Heading>

            <Text mt="8px">
              Ime i prezime
            </Text>
            <Input
              value={customer.name}
              placeholder="Upišite ime i prezime kupca"
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            />

            <Text mt="8px">
              Opis
            </Text>
            <Input
              value={customer.description}
              placeholder="Upišite opis kupca"
              onChange={(e) => setCustomer({ ...customer, description: e.target.value })}
            />
          </Box>
        </Flex>

        <Flex mt="32px" gap="32px" direction={{ base: "column", lg: "row" }}>
          <Box>
            <Heading textAlign="center" size="md" color="#E20074">
              Adresa računa
            </Heading>

            <Text mt="8px">
              Broj ulice
            </Text>
            <Input
              type="number"
              value={addressFrom.streetNr}
              placeholder="Upišite broj ulice"
              onChange={(e) => setAddressFrom({ ...addressFrom, streetNr: e.target.value })}
            />

            <Text mt="8px">
              Naziv ulice
            </Text>
            <Input
              value={addressFrom.streetName}
              placeholder="Upišite naziv ulice"
              onChange={(e) => setAddressFrom({ ...addressFrom, streetName: e.target.value })}
            />

            <Text mt="8px">
              Info
            </Text>
            <Input
              value={addressFrom.streetSuffix}
              placeholder="Upišite kat, ime firme, gdje parkirati i sl."
              onChange={(e) => setAddressFrom({ ...addressFrom, streetSuffix: e.target.value })}
            />

            <Text mt="8px">
              Poštanski broj
            </Text>
            <Input
              value={addressFrom.postcode}
              type="number"
              placeholder="Upišite poštanski broj"
              onChange={(e) => setAddressFrom({ ...addressFrom, postcode: e.target.value })}
            />

            <Text mt="8px">
              Grad
            </Text>
            <Input
              value={addressFrom.city}
              placeholder="Upišite grad"
              onChange={(e) => setAddressFrom({ ...addressFrom, city: e.target.value })}
            />

            <Text mt="8px">
              Država
            </Text>
            <Input
              value={addressFrom.country}
              placeholder="Upišite državu"
              onChange={(e) => setAddressFrom({ ...addressFrom, country: e.target.value })}
            />
          </Box>

          <Box>
            <Heading textAlign="center" size="md" color="#E20074">
              Dostava na
            </Heading>

            <Text mt="8px">
              Broj ulice
            </Text>
            <Input
              type="number"
              value={addressTo.streetNr}
              placeholder="Upišite broj ulice"
              onChange={(e) => setAddressTo({ ...addressTo, streetNr: e.target.value })}
            />

            <Text mt="8px">
              Naziv ulice
            </Text>
            <Input
              value={addressTo.streetName}
              placeholder="Upišite naziv ulice"
              onChange={(e) => setAddressTo({ ...addressTo, streetName: e.target.value })}
            />

            <Text mt="8px">
              Info
            </Text>
            <Input
              value={addressTo.streetSuffix}
              placeholder="Upišite kat, ime firme, gdje parkirati i sl."
              onChange={(e) => setAddressTo({ ...addressTo, streetSuffix: e.target.value })}
            />

            <Text mt="8px">
              Poštanski broj
            </Text>
            <Input
              value={addressTo.postcode}
              type="number"
              placeholder="Upišite poštanski broj"
              onChange={(e) => setAddressTo({ ...addressTo, postcode: e.target.value })}
            />

            <Text mt="8px">
              Grad
            </Text>
            <Input
              value={addressTo.city}
              placeholder="Upišite grad"
              onChange={(e) => setAddressTo({ ...addressTo, city: e.target.value })}
            />

            <Text mt="8px">
              Država
            </Text>
            <Input
              value={addressTo.country}
              placeholder="Upišite državu"
              onChange={(e) => setAddressTo({ ...addressTo, country: e.target.value })}
            />
          </Box>
        </Flex>

        <Heading size="md" mt="32px" color="#E20074">
          Narudžbe
        </Heading>

        {!flag && (
          <Box mt="8px" mb="8px">
            <Text mt="8px">
              Status
            </Text>
            <Select
              value={shipment.status}
              placeholder="Odaberite status pošiljke"
              onChange={(e) => setShipment({ ...shipment, status: e.target.value })}
            >
              {Object.entries(status).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
            </Select>

            <Text mt="8px">
              Razlog za promjenu statusa
            </Text>
            <Input
              value={shipment.statusChangeReason}
              placeholder="Upišite razlog za promjenu statusa"
              onChange={(e) => setShipment({ ...shipment, statusChangeReason: e.target.value })}
            />
          </Box>
        )}
        <Flex
          justify="center"
          mt={order.length ? "16px" : ""}
          w={{ base: "264px", lg: "900px" }}
          flexWrap="wrap"
          gap="16px"
        >
          {order.map((o, index) => (
            <Box key={index} p="16px" border="solid 3px #E20074" borderRadius="16px">
              <Text w="24px" onClick={() => removeOrder(index)} _hover={{ cursor: "pointer" }}>
                <FiXCircle size="24px" color="#E20074" />
              </Text>

              <Text mt="8px">
                Naziv
              </Text>
              <Input
                value={o.name}
                placeholder="Upišite naziv narudžbe"
                onChange={(e) => handleChangeOrder(index, "name", e)}
              />

              <Text mt="8px">
                Vrsta na koju se odnosi narudžba
              </Text>
              <Input
                value={o.referredType}
                placeholder="Odaberite vrsta na koju se odnosi narudžba"
                onChange={(e) => handleChangeOrder(index, "referredType", e)}
              />
            </Box>
          ))}
        </Flex>

        <Button mt="16px" w="50px" h="50px" borderRadius="50%" onClick={addOrder}>
          <FaPlus size="20px" />
        </Button>

        {error && (
          <Text mt="64px" color="red">
            * Mora postojati barem jedna narudžba te se sva polja moraju ispuniti!
          </Text>
        )}

        <Flex align="center" justify="center" mt={error ? "16px" : "64px"} mb="64px" gap="16px">
          <Button mt="16px" variant="unstyled" as="a" href="/">
            Odustani
          </Button>

          <Button p="24px" onClick={handleSubmit}>
            {flag ? "Kreiraj" : "Uredi"}
          </Button>
        </Flex>
      </Flex>

      <Divider />

      <Footer />
    </>
  );
}
