import Footer from "@/components/shared/Fotter";
import Header from "@/components/shared/Header";
import getCarriers from "@/helpers/getCarriers";
import getEnums from "@/helpers/getEnums";
import getShipmentTracking from "@/helpers/getShipmentTracking";
import getShipmentTrackingByStatus from "@/helpers/getShipmentTrackingByStatus";
import getShipmentTrackingByTrackingId from "@/helpers/getShipmentTrackingByTrackingId";
import IProps from "@/interfaces/IProps";
import IShipment from "@/interfaces/IShipment";
import IShipmentProps from "@/interfaces/IShipmentProps";
import getStatus from "@/utils/getStatus";
import { Box, Button, Divider, Flex, Heading, Input, Select, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

export default function Home({ status, carriers }: IShipmentProps) {
  const [shipment, setShipment] = useState<IShipment[]>([]);
  const [filter, setFilter] = useState(0);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchShipmentTracking = async () => {
      try {
        if (filter === 0) {
          const res = await getShipmentTracking(id);
          if (res.status === 200) {
            setShipment(res.data);
          }
        } else if (filter === 1) {
          const res = await getShipmentTrackingByStatus(id);
          if (res.status === 200) {
            setShipment(res.data);
          }
        } else {
          const res = await getShipmentTrackingByTrackingId(id);
          if (res.status === 200) {
            setShipment([res.data]);
          }
        }
      } catch (error) {
        throw error;
      }
    };

    fetchShipmentTracking();
  }, [id]);

  return (
    <>
      <Header />
      <Flex minH="calc(100vh - 405px)" direction="column" align="center" mt="64px" mb="64px">
        <Button
          p="24px"
          fontSize={{ base: "16px", md: "20px" }}
          borderRadius="16px"
          bgColor="#E20074"
          _hover={{ bgColor: "#D1006C" }}
          color="white"
          as="a"
          href="/NewShipment"
        >
          Kreiraj novu dostavu
        </Button>

        <Text mt="64px" fontSize={{ base: "16px", md: "20px" }}>
          Dohvati podatke o pošiljkama za dostavu prema:
        </Text>
        <Flex mt="16px" gap="8px">
          <Text
            p="8px"
            fontSize={{ base: "16px", md: "20px" }}
            border="4px solid"
            borderRadius="16px"
            borderColor={filter == 0 ? "#E20074" : "#A4A4A4"}
            color={filter == 0 ? "#E20074" : "#A4A4A4"}
            _hover={{
              borderColor: filter == 0 ? "#E20074" : "#757575",
              color: filter == 0 ? "#E20074" : "#757575",
              cursor: "pointer",
            }}
            onClick={() => {
              setFilter(0);
              setId("");
            }}
          >
            ID-u korisnika
          </Text>
          <Text
            p="8px"
            fontSize={{ base: "16px", md: "20px" }}
            border="4px solid"
            borderRadius="16px"
            borderColor={filter == 1 ? "#E20074" : "#A4A4A4"}
            color={filter == 1 ? "#E20074" : "#A4A4A4"}
            _hover={{
              borderColor: filter == 1 ? "#E20074" : "#757575",
              color: filter == 1 ? "#E20074" : "#757575",
              cursor: "pointer",
            }}
            onClick={() => {
              setFilter(1);
              setId("");
            }}
          >
            Statusu pošiljke
          </Text>
          <Text
            p="8px"
            fontSize={{ base: "16px", md: "20px" }}
            border="4px solid"
            borderRadius="16px"
            borderColor={filter == 2 ? "#E20074" : "#A4A4A4"}
            color={filter == 2 ? "#E20074" : "#A4A4A4"}
            _hover={{
              borderColor: filter == 2 ? "#E20074" : "#757575",
              color: filter == 2 ? "#E20074" : "#757575",
              cursor: "pointer",
            }}
            onClick={() => {
              setFilter(2);
              setId("");
            }}
          >
            Broju ugovora
          </Text>
        </Flex>

        {filter == 0 && (
          <Input
            mt="16px"
            w={{ base: "300px", sm: "432px", md: "664px", lg: "800px" }}
            fontSize={{ base: "16px", md: "20px" }}
            borderColor="#A4A4A4"
            _hover={{ borderColor: "#E20074" }}
            focusBorderColor="#E20074"
            placeholder="Upišite ID korisnika"
            onChange={(e) => setId(e.target.value)}
          />
        )}
        {filter == 1 && (
          <Select
            mt="16px"
            w={{ base: "300px", sm: "432px", md: "664px", lg: "800px" }}
            fontSize={{ base: "16px", md: "20px" }}
            borderColor="#A4A4A4"
            _hover={{ borderColor: "#E20074" }}
            focusBorderColor="#E20074"
            placeholder="Odaberite status pošiljke"
            onChange={(e) => setId(e.target.value)}
          >
            <option value="initialized">Inicijalizirano</option>
            <option value="inProcess">U tijeku</option>
            <option value="processed">Obrađeno</option>
            <option value="shipped">Poslano</option>
            <option value="inCustoms">Na carini</option>
            <option value="delivered">Isporučeno</option>
            <option value="returned">Vraćeno</option>
            <option value="error">Greška</option>
          </Select>
        )}
        {filter == 2 && (
          <Input
            mt="16px"
            w={{ base: "300px", sm: "432px", md: "664px", lg: "800px" }}
            fontSize={{ base: "16px", md: "20px" }}
            borderColor="#A4A4A4"
            _hover={{ borderColor: "#E20074" }}
            focusBorderColor="#E20074"
            placeholder="Upišite broj ugovora"
            onChange={(e) => setId(e.target.value)}
          />
        )}

        <Flex justify="center" flexWrap="wrap" gap="64px" mt="64px">
          {shipment?.map((s) => (
            <Box
              fontSize={{ base: "16px", md: "20px" }}
              w={{ base: "300px", sm: "432px", md: "600px" }}
              textAlign="center"
              boxShadow="dark-lg"
              borderRadius="8px"
              p="32px"
            >
              <Heading color="#E20074">{s.trackingCode}</Heading>
              <Text
                as="a"
                href={s.carrierTrackingUrl}
                _hover={{ color: "#757575" }}
                fontSize="14px"
                color="#A4A4A4"
              >
                {s.carrierTrackingUrl}
              </Text>

              <Text>
                Kreirano: {s.createDate?.split("T")[0]}, {s.createDate?.split("T")[1]}
              </Text>
              <Text>
                {getStatus(s.status || "")} - {s.statusChangeReason}, {s.statusChangeDate?.split("T")[0]},{" "}
                {s.statusChangeDate?.split("T")[1]}
              </Text>

              <Divider mt="16px" />

              <Heading mt="16px" size="lg">
                Dostavljač
              </Heading>
              <Text>{carriers.filter((c) => c.id == s.carrier)[0]?.name}</Text>
              <Text>
                Procijenjeni datum isporuke: {s.estimatedDeliveryDate?.split("T")[0]},
                {s.estimatedDeliveryDate?.split("T")[1]}
              </Text>

              <Divider mt="16px" />

              <Heading mt="16px" size="lg">
                Kupac
              </Heading>
              <Text as="a" href={s.relatedCustomer?.href} _hover={{ color: "#757575" }} fontSize="14px" color="#A4A4A4">
                {s.relatedCustomer?.href}
              </Text>
              <Text>{s.relatedCustomer?.name}</Text>
              <Text>{s.relatedCustomer?.description}</Text>

              <Divider mt="16px" />

              <Heading mt="16px" size="lg">
                Adresa računa
              </Heading>
              <Text>
                {s.addressFrom?.streetName} {s.addressFrom?.streetNr}, {s.addressFrom?.streetSuffix}
              </Text>
              <Text>
                {s.addressFrom?.postcode} {s.addressFrom?.city}, {s.addressFrom?.country}
              </Text>

              <Heading mt="16px" size="lg">
                Dostava na
              </Heading>
              <Text>
                {s.addressTo?.streetName} {s.addressTo?.streetNr}, {s.addressTo?.streetSuffix}
              </Text>
              <Text>
                {s.addressTo?.postcode} {s.addressTo?.city}, {s.addressTo?.country}
              </Text>

              <Divider mt="16px" />

              <Heading mt="16px" size="lg">
                Narudžbe
              </Heading>
              <Text>Težina: {s.weight} kg</Text>

              <Flex mt="8px" direction="column" gap="16px">
                {s.order?.map((o) => (
                  <Box border="3px solid #E20074" borderRadius="16px" p="8px">
                    <Text >{o.name}</Text>
                    <Text as="a" href={o.href} _hover={{ color: "#757575" }} fontSize="14px" color="#A4A4A4">
                      {o.href}
                    </Text>
                    <Text>{o.referredType}</Text>
                  </Box>
                ))}
              </Flex>

              <Button
                mt="32px"
                p="24px"
                fontSize={{ base: "16px", md: "20px" }}
                borderRadius="16px"
                bgColor="#E20074"
                _hover={{ bgColor: "#D1006C" }}
                color="white"
                onClick={() => {
                  window.location.href = `/UpdateShipment?id=${s.id}`;
                }}
              >
                Uredi
              </Button>
            </Box>
          ))}
        </Flex>
      </Flex>

      <Divider />

      <Footer />
    </>
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
