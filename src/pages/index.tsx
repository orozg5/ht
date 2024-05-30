import Footer from "@/components/shared/Fotter";
import Header from "@/components/shared/Header";
import getCarriers from "@/fetches/getCarriers";
import getEnums from "@/fetches/getEnums";
import getShipmentTracking from "@/fetches/getShipmentTracking";
import getShipmentTrackingByStatus from "@/fetches/getShipmentTrackingByStatus";
import getShipmentTrackingByTrackingId from "@/fetches/getShipmentTrackingByTrackingId";
import IProps from "@/interfaces/IProps";
import IShipment from "@/interfaces/IShipment";
import IShipmentProps from "@/interfaces/IShipmentProps";
import { Box, Button, Divider, Flex, Heading, Input, Select, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

export default function Home({ status, carriers }: IShipmentProps) {
  const [shipment, setShipment] = useState<IShipment[]>([]);
  const [filter, setFilter] = useState(0);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchShipmentTracking = async () => {
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
          if (!Array.isArray(res.data)) {
            setShipment([res.data]);
          } else {
            setShipment(res.data);
          }
        } else {
          setShipment([]);
        }
      }
    };

    fetchShipmentTracking();
  }, [id, filter]);

  return (
    <>
      <Header />
      <Flex minH="calc(100vh - 405px)" direction="column" align="center" mt="64px" mb="64px">
        <Button p="24px" as="a" href="/NewShipment">
          Kreiraj novu dostavu
        </Button>

        <Text mt="64px" w={{ base: "300px", sm: "400px", md: "600px" }} textAlign="center">
          Dohvati podatke o pošiljkama za dostavu prema:
        </Text>
        <Flex mt="16px" gap="8px" direction={{ base: "column", sm: "row" }}>
          <Text
            p="8px"
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
            w={{ base: "300px", sm: "400px", md: "600px" }}
            placeholder="Upišite ID korisnika"
            onChange={(e) => setId(e.target.value)}
          />
        )}

        {filter == 1 && (
          <Select
            mt="16px"
            w={{ base: "300px", sm: "400px", md: "600px" }}
            borderColor="#A4A4A4"
            _hover={{ borderColor: "#E20074" }}
            focusBorderColor="#E20074"
            placeholder="Odaberite status pošiljke"
            onChange={(e) => setId(e.target.value)}
          >
            {Object.entries(status).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </Select>
        )}

        {filter == 2 && (
          <Input
            mt="16px"
            w={{ base: "300px", sm: "400px", md: "600px", lg: "600px" }}
            placeholder="Upišite broj ugovora"
            onChange={(e) => setId(e.target.value)}
          />
        )}

        <Flex justify="center" flexWrap="wrap" gap="32px" mt="32px" p="32px">
          {shipment?.map((s) => (
            <Flex
              direction="column"
              key={s.id}
              w={{ base: "300px", sm: "400px", md: "464px" }}
              textAlign="center"
              boxShadow="dark-lg"
              borderRadius="8px"
              p="32px"
            >
              <Heading size="lg" color="#E20074">
                {s.trackingCode}
              </Heading>
              <Text as="a" href={s.carrierTrackingUrl} _hover={{ color: "#757575" }} fontSize="14px" color="#A4A4A4">
                {s.carrierTrackingUrl}
              </Text>

              <Text>
                Kreirano: {s.createDate?.split("T")[0]}, {s.createDate?.split("T")[1]}
              </Text>
              <Text>
                {status[s.status || "initialized"]} - {s.statusChangeReason}, {s.statusChangeDate?.split("T")[0]},{" "}
                {s.statusChangeDate?.split("T")[1]}
              </Text>

              <Divider mt="16px" />

              <Heading mt="16px" size="md">
                Dostavljač
              </Heading>
              <Text>{carriers.filter((c) => c.id == s.carrier)[0]?.name}</Text>
              <Text>
                Procijenjeni datum isporuke: {s.estimatedDeliveryDate?.split("T")[0]},
                {s.estimatedDeliveryDate?.split("T")[1]}
              </Text>

              <Divider mt="16px" />

              <Heading mt="16px" size="md">
                Kupac
              </Heading>
              <Text>{s.relatedCustomer?.name}</Text>
              <Text>{s.relatedCustomer?.description}</Text>

              <Divider mt="16px" />

              <Heading mt="16px" size="md">
                Adresa računa
              </Heading>
              <Text>
                {s.addressFrom?.streetName} {s.addressFrom?.streetNr}, {s.addressFrom?.streetSuffix}
              </Text>
              <Text>
                {s.addressFrom?.postcode} {s.addressFrom?.city}, {s.addressFrom?.country}
              </Text>

              <Heading mt="16px" size="md">
                Dostava na
              </Heading>
              <Text>
                {s.addressTo?.streetName} {s.addressTo?.streetNr}, {s.addressTo?.streetSuffix}
              </Text>
              <Text>
                {s.addressTo?.postcode} {s.addressTo?.city}, {s.addressTo?.country}
              </Text>

              <Divider mt="16px" />

              <Heading mt="16px" size="md">
                Narudžbe
              </Heading>
              <Text>Težina: {s.weight} kg</Text>

              <Flex mt="8px" mb="32px" direction="column" gap="16px">
                {s.order?.map((o) => (
                  <Box key={o.id} border="3px solid #E20074" borderRadius="16px" p="8px">
                    <Text>{o.name}</Text>
                    <Text>{o.referredType}</Text>
                  </Box>
                ))}
              </Flex>

              <Button
                mt="auto"
                p="24px"
                onClick={() => {
                  window.location.href = `/UpdateShipment?id=${s.id}`;
                }}
              >
                Uredi
              </Button>
            </Flex>
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
