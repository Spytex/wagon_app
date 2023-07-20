import { FC, PropsWithChildren } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Box, Flex } from "@chakra-ui/react";

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box as="main" flex="1">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}

export default Layout;
