import * as React from "react";
import { Box, Flex } from "@chakra-ui/react";

export const FullPageErrorFallback = () => {
  return (
    <Box role="alert">
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        h={"100vh"}
      >
        <p>Uh oh... There is a problem. Try refreshing the app.</p>
      </Flex>
    </Box>
  );
};
