import { extendTheme } from "@chakra-ui/react";
import { Input } from "./components/input";
import { Button } from "./components/button";

export const theme = extendTheme({
  colors: {
    brand: {
      gray: "#A4A4A4",
      dark_gray: "#757575",
      pink: "#E20074",
      dark_pink: "#D1006C",
    },
  },
  
  components: {
    Input,
    Button
  },
});
