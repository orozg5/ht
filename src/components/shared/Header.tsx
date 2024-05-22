import { Flex, Image } from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
  return (
    <Flex h="80px" bgColor="#E20074" align="center">
      <Link href="/">
        <Image src="ht-logo.png" w="34px" ml="30px" />
      </Link>
    </Flex>
  );
}
