import * as React from "react";
import Head from "next/head";
import NavBar from "src/components/nav-bar";
import { Box } from "@chakra-ui/react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => (
  <div>
    <Head>
      <title>Couture</title>
      <meta
        name="description"
        content="Couture - the business of designing, making, and selling fashionable custom-made clothing."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box maxW={"1600"} margin={"auto"}>
      <NavBar />
      <main>
        <Box p={8}>{props.children}</Box>
      </main>
    </Box>
  </div>
);

export default Layout;
