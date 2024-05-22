import Footer from "@/components/shared/Fotter";
import Header from "@/components/shared/Header";
import IAddress from "@/interfaces/IAddress";
import ICustomer from "@/interfaces/ICustomer";
import IOrder from "@/interfaces/IOrder";
import IShipment from "@/interfaces/IShipment";
import { Box, Button, Divider, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";

export default function NewShipment() {
  const [error, setError] = useState<boolean>(false);
  const [shipment, setShipment] = useState<IShipment>({});
  const [customer, setCustomer] = useState<ICustomer>({});
  const [addressFrom, setAddressFrom] = useState<IAddress>({});
  const [addressTo, setAddressTo] = useState<IAddress>({});
  const [order, setOrder] = useState<IOrder[]>([]);

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
    if (
      a === undefined ||
      a?.streetNr === undefined ||
      a?.streetName === undefined ||
      a?.streetSuffix === undefined ||
      a?.postcode === undefined ||
      a?.city === undefined ||
      a?.country === undefined ||
      !a?.streetNr ||
      !a?.streetName ||
      !a?.streetSuffix ||
      !a?.postcode ||
      !a?.city ||
      !a?.country
    ) {
      setError(true);
      return true;
    }
  };

  const isEmpty = (ship: IShipment) => {
    if (
      ship.carrier === undefined ||
      ship.weight === undefined ||
      ship.estimatedDeliveryDate === undefined ||
      ship.relatedCustomer === undefined ||
      ship.relatedCustomer?.name === undefined ||
      ship.relatedCustomer?.description === undefined ||
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
    let res = isAddressEmpty(ship.addressFrom);
    if (res) {
      return true;
    }
    res = isAddressEmpty(ship.addressTo);
    if (res) {
      return true;
    }
    if (ship.order) {
      for (let o of ship.order) {
        if (!o.name || !o.referredType) {
          setError(true);
          return true;
        }
      }
    } else {
      setError(true);
      return true;
    }
    setError(false);
    return false;
  };

  const handleSubmit = () => {
    setError(false);
    const ship = {
      carrier: shipment.carrier,
      weight: shipment.weight,
      estimatedDeliveryDate: shipment.estimatedDeliveryDate,
      addressFrom: addressFrom,
      addressTo: addressTo,
      order: order,
      relatedCustomer: customer,
    };
    const err = isEmpty(ship);
    if (!err) {
    }
  };

  return (
    <>
      <Header />
      <Flex mt="32px" direction="column" align="center">
        <Heading color="#E20074" p="16px">
          Kreiraj novu dostavu
        </Heading>

        <Flex gap="32px" mt="32px" direction={{ base: "column", lg: "row" }}>
          <Box>
            <Heading textAlign="center" size="lg" color="#E20074">
              Dostavljač
            </Heading>
            <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
              Naziv dostavljača
            </Text>
            <Input
              w={{ base: "300px", sm: "400px" }}
              fontSize={{ base: "16px", md: "20px" }}
              borderColor="#A4A4A4"
              _hover={{ borderColor: "#E20074" }}
              focusBorderColor="#E20074"
              placeholder="Odaberite dostavljača"
              onChange={(e) => setShipment({ ...shipment, carrier: e.target.value })}
            />
            <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
              Procijenjeni datum isporuke
            </Text>
            <Input
              w={{ base: "300px", sm: "400px" }}
              type="datetime-local"
              fontSize={{ base: "16px", md: "20px" }}
              borderColor="#A4A4A4"
              _hover={{ borderColor: "#E20074" }}
              focusBorderColor="#E20074"
              onChange={(e) => setShipment({ ...shipment, estimatedDeliveryDate: e.target.value })}
            />
            <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
              Težina (kg)
            </Text>
            <Input
              w={{ base: "300px", sm: "400px" }}
              type="number"
              fontSize={{ base: "16px", md: "20px" }}
              borderColor="#A4A4A4"
              _hover={{ borderColor: "#E20074" }}
              focusBorderColor="#E20074"
              placeholder="Upišite težinu narudžbe"
              onChange={(e) => setShipment({ ...shipment, weight: Number(e.target.value) })}
            />
          </Box>
          <Box>
            <Heading textAlign="center" size="lg" color="#E20074">
              Kupac
            </Heading>
            <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
              Ime i prezime
            </Text>
            <Input
              w={{ base: "300px", sm: "400px" }}
              fontSize={{ base: "16px", md: "20px" }}
              borderColor="#A4A4A4"
              _hover={{ borderColor: "#E20074" }}
              focusBorderColor="#E20074"
              placeholder="Upišite ime i prezime kupca"
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            />
            <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
              Opis
            </Text>
            <Input
              w={{ base: "300px", sm: "400px" }}
              fontSize={{ base: "16px", md: "20px" }}
              borderColor="#A4A4A4"
              _hover={{ borderColor: "#E20074" }}
              focusBorderColor="#E20074"
              placeholder="Upišite opis kupca"
              onChange={(e) => setCustomer({ ...customer, description: e.target.value })}
            />
          </Box>
        </Flex>

        <Flex mt="32px" gap="32px" direction={{ base: "column", lg: "row" }}>
          <Box>
            <Heading textAlign="center" size="lg" color="#E20074">
              Adresa računa
            </Heading>
            <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
              Broj ulice
            </Text>
            <Input
              w={{ base: "300px", sm: "400px" }}
              fontSize={{ base: "16px", md: "20px" }}
              borderColor="#A4A4A4"
              _hover={{ borderColor: "#E20074" }}
              focusBorderColor="#E20074"
              placeholder="Upišite broj ulice"
              onChange={(e) => setAddressFrom({ ...addressFrom, streetNr: e.target.value })}
            />
            <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
              Naziv ulice
            </Text>
            <Input
              w={{ base: "300px", sm: "400px" }}
              fontSize={{ base: "16px", md: "20px" }}
              borderColor="#A4A4A4"
              _hover={{ borderColor: "#E20074" }}
              focusBorderColor="#E20074"
              placeholder="Upišite naziv ulice"
              onChange={(e) => setAddressFrom({ ...addressFrom, streetName: e.target.value })}
            />
            <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
              Info
            </Text>
            <Input
              w={{ base: "300px", sm: "400px" }}
              fontSize={{ base: "16px", md: "20px" }}
              borderColor="#A4A4A4"
              _hover={{ borderColor: "#E20074" }}
              focusBorderColor="#E20074"
              placeholder="Upišite kat, ime firme, gdje parkirati i sl."
              onChange={(e) => setAddressFrom({ ...addressFrom, streetSuffix: e.target.value })}
            />
            <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
              Poštanski broj
            </Text>
            <Input
              w={{ base: "300px", sm: "400px" }}
              type="number"
              fontSize={{ base: "16px", md: "20px" }}
              borderColor="#A4A4A4"
              _hover={{ borderColor: "#E20074" }}
              focusBorderColor="#E20074"
              placeholder="Upišite poštanski broj"
              onChange={(e) => setAddressFrom({ ...addressFrom, postcode: e.target.value })}
            />
            <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
              Grad
            </Text>
            <Input
              w={{ base: "300px", sm: "400px" }}
              fontSize={{ base: "16px", md: "20px" }}
              borderColor="#A4A4A4"
              _hover={{ borderColor: "#E20074" }}
              focusBorderColor="#E20074"
              placeholder="Upišite grad"
              onChange={(e) => setAddressFrom({ ...addressFrom, city: e.target.value })}
            />
            <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
              Država
            </Text>
            <Input
              w={{ base: "300px", sm: "400px" }}
              fontSize={{ base: "16px", md: "20px" }}
              borderColor="#A4A4A4"
              _hover={{ borderColor: "#E20074" }}
              focusBorderColor="#E20074"
              placeholder="Upišite državu"
              onChange={(e) => setAddressFrom({ ...addressFrom, country: e.target.value })}
            />
          </Box>
          <Box>
            <Heading textAlign="center" size="lg" color="#E20074">
              Dostava na
            </Heading>
            <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
              Broj ulice
            </Text>
            <Input
              w={{ base: "300px", sm: "400px" }}
              fontSize={{ base: "16px", md: "20px" }}
              borderColor="#A4A4A4"
              _hover={{ borderColor: "#E20074" }}
              focusBorderColor="#E20074"
              placeholder="Upišite broj ulice"
              onChange={(e) => setAddressTo({ ...addressTo, streetNr: e.target.value })}
            />
            <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
              Naziv ulice
            </Text>
            <Input
              w={{ base: "300px", sm: "400px" }}
              fontSize={{ base: "16px", md: "20px" }}
              borderColor="#A4A4A4"
              _hover={{ borderColor: "#E20074" }}
              focusBorderColor="#E20074"
              placeholder="Upišite naziv ulice"
              onChange={(e) => setAddressTo({ ...addressTo, streetName: e.target.value })}
            />
            <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
              Info
            </Text>
            <Input
              w={{ base: "300px", sm: "400px" }}
              fontSize={{ base: "16px", md: "20px" }}
              borderColor="#A4A4A4"
              _hover={{ borderColor: "#E20074" }}
              focusBorderColor="#E20074"
              placeholder="Upišite kat, ime firme, gdje parkirati i sl."
              onChange={(e) => setAddressTo({ ...addressTo, streetSuffix: e.target.value })}
            />
            <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
              Poštanski broj
            </Text>
            <Input
              w={{ base: "300px", sm: "400px" }}
              type="number"
              fontSize={{ base: "16px", md: "20px" }}
              borderColor="#A4A4A4"
              _hover={{ borderColor: "#E20074" }}
              focusBorderColor="#E20074"
              placeholder="Upišite poštanski broj"
              onChange={(e) => setAddressTo({ ...addressTo, postcode: e.target.value })}
            />
            <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
              Grad
            </Text>
            <Input
              w={{ base: "300px", sm: "400px" }}
              fontSize={{ base: "16px", md: "20px" }}
              borderColor="#A4A4A4"
              _hover={{ borderColor: "#E20074" }}
              focusBorderColor="#E20074"
              placeholder="Upišite grad"
              onChange={(e) => setAddressTo({ ...addressTo, city: e.target.value })}
            />
            <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
              Država
            </Text>
            <Input
              w={{ base: "300px", sm: "400px" }}
              fontSize={{ base: "16px", md: "20px" }}
              borderColor="#A4A4A4"
              _hover={{ borderColor: "#E20074" }}
              focusBorderColor="#E20074"
              placeholder="Upišite državu"
              onChange={(e) => setAddressTo({ ...addressTo, country: e.target.value })}
            />
          </Box>
        </Flex>

        <Heading size="lg" mt="32px" color="#E20074">
          Narudžbe
        </Heading>
        <Flex
          justify="center"
          mt={order.length ? "16px" : ""}
          w={{ base: "264px", lg: "900px" }}
          flexWrap="wrap"
          gap="16px"
        >
          {order.map((o, index) => (
            <Box key={index} p="16px" border="solid 1px #E20074" borderRadius="16px">
              <Text w="24px" onClick={() => removeOrder(index)} _hover={{ cursor: "pointer" }}>
                <FiXCircle size="24px" color="#E20074" />
              </Text>
              <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
                Naziv
              </Text>
              <Input
                w={{ base: "300px", sm: "400px" }}
                fontSize={{ base: "16px", md: "20px" }}
                borderColor="#A4A4A4"
                _hover={{ borderColor: "#E20074" }}
                focusBorderColor="#E20074"
                placeholder="Upišite naziv narudžbe"
                onChange={(e) => handleChangeOrder(index, "name", e)}
              />
              <Text mt="8px" fontSize={{ base: "16px", md: "20px" }}>
                Vrsta na koju se odnosi narudžba
              </Text>
              <Input
                w={{ base: "300px", sm: "400px" }}
                fontSize={{ base: "16px", md: "20px" }}
                borderColor="#A4A4A4"
                _hover={{ borderColor: "#E20074" }}
                focusBorderColor="#E20074"
                placeholder="Odaberite vrsta na koju se odnosi narudžba"
                onChange={(e) => handleChangeOrder(index, "referredType", e)}
              />
            </Box>
          ))}
        </Flex>

        <Button
          mt="16px"
          w="50px"
          h="50px"
          color="white"
          fontSize={{ base: "16px", md: "20px" }}
          borderRadius="50%"
          bgColor="#E20074"
          _hover={{ bgColor: "#D1006C" }}
          onClick={addOrder}
        >
          <FaPlus size="20px" />
        </Button>

        {error && (
          <Text mt="64px" color="red" fontSize={{ base: "16px", md: "20px" }}>
            * Mora postojati barem jedna narudžba te se sva polja moraju ispuniti!
          </Text>
        )}

        <Flex align="center" justify="center" mt={error ? "16px" : "64px"} mb="64px" gap="16px">
          <Button
            fontSize={{ base: "16px", md: "20px" }}
            variant="unstyled"
            _hover={{ color: "#E20074" }}
            as="a"
            href="/"
          >
            Odustani
          </Button>
          <Button
            p="24px"
            fontSize={{ base: "16px", md: "20px" }}
            borderRadius="16px"
            bgColor="#E20074"
            _hover={{ bgColor: "#D1006C" }}
            color="white"
            onClick={handleSubmit}
          >
            Kreiraj
          </Button>
        </Flex>
      </Flex>

      <Divider />

      <Footer />
    </>
  );
}
