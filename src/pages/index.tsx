import Footer from "@/components/shared/Fotter";
import Header from "@/components/shared/Header";
import { Box, Button, Divider, Flex, Heading, Input, Select, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [filter, setFilter] = useState(0);
  const [id, setId] = useState("");

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
            <option value="Inicijalizirano">Inicijalizirano</option>
            <option value="U tranzitu">U tranzitu</option>
            <option value="Isporučeno">Isporučeno</option>
            <option value="Problem s isporukom">Problem s isporukom</option>
            <option value="Vraćeno">Vraćeno</option>
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
        {id && (
          <Button
            mt="16px"
            p="24px"
            fontSize={{ base: "16px", md: "20px" }}
            borderRadius="16px"
            bgColor="#E20074"
            _hover={{ bgColor: "#D1006C" }}
            color="white"
          >
            Dohvati
          </Button>
        )}

        <Flex justify="center" flexWrap="wrap" gap="16px" mt="64px">
          <Box
            fontSize={{ base: "16px", md: "20px" }}
            w="600px"
            textAlign="center"
            boxShadow="dark-lg"
            borderRadius="8px"
            p="32px"
          >
            <Heading color="#E20074">HR123456789</Heading>
            <Text as="a" href="https://posiljka.posta.hr" _hover={{ color: "#757575" }} fontSize="14px" color="#A4A4A4">
              https://posiljka.posta.hr
            </Text>

            <Text>Kreirano: 2024-05-22, 13:17</Text>
            <Text>Inicijalizirano - Naručeno, 2024-05-22, 13:17</Text>

            <Heading mt="16px" size="lg">
              Dostavljač
            </Heading>
            <Text>Hrvatska pošta</Text>
            <Text>Procijenjeni datum isporuke: 2024-06-01, 13:17</Text>

            <Heading mt="16px" size="lg">
              Kupac
            </Heading>
            <Text
              as="a"
              href="http://localhost:3000/user/d9f0f4f3-0522-4867-b5bc-8b0522ff2c29"
              _hover={{ color: "#757575" }}
              fontSize="14px"
              color="#A4A4A4"
            >
              http://localhost:3000/user/d9f0f4f3-0522-4867-b5bc-8b0522ff2c29
            </Text>
            <Text>Marko Marković</Text>
            <Text>Privatni kupac</Text>

            <Heading mt="16px" size="lg">
              Adresa računa
            </Heading>
            <Text>123 Ulica Hrvatskog proljeća, Ulica</Text>
            <Text>10000 Zagreb, Hrvatska</Text>

            <Heading mt="16px" size="lg">
              Dostava na
            </Heading>
            <Text>456 Ulica Prve Dalmatinske Brigade, Ulica</Text>
            <Text>21000 Split, Hrvatska</Text>

            <Heading mt="16px" size="lg">
              Narudžbe
            </Heading>
            <Text>Težina: 0.232 kg</Text>

            <Text mt="8px">Samsung Galaxy S24 Ultra</Text>
            <Text
              as="a"
              href="http://localhost:3000/order/3d1a4d13-43fd-48b8-b22d-31bb091b0f33"
              _hover={{ color: "#757575" }}
              fontSize="14px"
              color="#A4A4A4"
            >
              http://localhost:3000/order/3d1a4d13-43fd-48b8-b22d-31bb091b0f33
            </Text>
            <Text>Proizvod</Text>

            <Button
              mt="32px"
              p="24px"
              fontSize={{ base: "16px", md: "20px" }}
              borderRadius="16px"
              bgColor="#E20074"
              _hover={{ bgColor: "#D1006C" }}
              color="white"
            >
              Uredi
            </Button>
          </Box>
        </Flex>
      </Flex>

      <Divider />

      <Footer />
    </>
  );
}
