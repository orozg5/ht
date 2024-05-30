import { Flex, Image } from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
  return (
    <Flex h="60px" bgColor="#E20074" align="center">
      <Link href="/">
        <Image src="ht-logo.png" alt="HT" w="26px" ml="26px" />
      </Link>
    </Flex>
  );
}
