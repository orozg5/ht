import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const solid = defineStyle({
  borderRadius: "16px",
  bgColor: "#E20074",
  _hover: { bgColor: "#D1006C" },
  color: "white",
});

const unstyled = defineStyle({
  _hover: { color: "#E20074" },
});

export const Button = defineStyleConfig({
  variants: { solid, unstyled },
});
