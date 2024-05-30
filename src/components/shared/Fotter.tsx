import { Button, Flex } from "@chakra-ui/react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { GrFacebookOption } from "react-icons/gr";

export default function Footer() {
  return (
    <Flex mt="64px" h="130px" direction="column" align="center">
      <Flex gap="48px">
        <Button
          as="a"
          href="https://www.facebook.com/HrvatskiTelekom"
          bgColor="#A4A4A4"
          _hover={{ bgColor: "#757575" }}
          borderRadius="50%"
          w={{ base: "48px", md: "54px" }}
          h={{ base: "48px", md: "54px" }}
        >
          <GrFacebookOption size="32px" color="white" />
        </Button>

        <Button
          as="a"
          href="https://www.instagram.com/hrvatski.telekom"
          bgColor="#A4A4A4"
          _hover={{ bgColor: "#757575" }}
          borderRadius="50%"
          w={{ base: "48px", md: "54px" }}
          h={{ base: "48px", md: "54px" }}
        >
          <FaInstagram size="32px" color="white" />
        </Button>

        <Button
          as="a"
          href="https://www.youtube.com/user/HrvatskiTelekom"
          bgColor="#A4A4A4"
          _hover={{ bgColor: "#757575" }}
          borderRadius="50%"
          w={{ base: "48px", md: "54px" }}
          h={{ base: "48px", md: "54px" }}
        >
          <FaYoutube size="32px" color="white" />
        </Button>
        
        <Button
          as="a"
          href="https://www.tiktok.com/@hrvatski.telekom"
          bgColor="#A4A4A4"
          _hover={{ bgColor: "#757575" }}
          borderRadius="50%"
          w={{ base: "48px", md: "54px" }}
          h={{ base: "48px", md: "54px" }}
        >
          <FaTiktok size="32px" color="white" />
        </Button>
      </Flex>
    </Flex>
  );
}
