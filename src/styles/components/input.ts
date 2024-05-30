import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
const baseStyle = defineStyle({
  field: {
    w: { base: "300px", sm: "400px" },
  },
});

const variantOutline = defineStyle({
  field: {
    borderColor: "brand.gray",
    _hover: { borderColor: "brand.pink" },
    _focus: { boxShadow: "none", border: "3px solid", borderColor: "brand.pink" },
  },
});

const variants = {
  outline: variantOutline,
};

export const Input = defineStyleConfig({
  variants,
  baseStyle,
});
