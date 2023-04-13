import { ConnectWallet, useContract, useMetadata } from "@thirdweb-dev/react";
import type { NextPage } from "next";
// import styles from "../styles/Home.module.css";
import { Container, Flex, Box, SimpleGrid, Text } from "@chakra-ui/react";

const Home: NextPage = () => {
  const contractAddress = "0xbC1dE8684e47aBc14eeD008ec1f9C54b600bCec7";
  const { contract } = useContract(contractAddress);
  const {data: metadata, isLoading: isLoadingMetadata} = useMetadata(contract);
  return (
    <>
    <Container>
      <Flex p={"20px"} justifyContent={"space-between"}>
        <Box></Box>
        <ConnectWallet />
      </Flex>
      <Flex h={"90vh"} alignItems={"center"} justifyContent={"center"}>
        <SimpleGrid columns={2} spacing={10}>
          <Box></Box>
          <Flex>
            <Text>NFT Project</Text>
          </Flex>
          </SimpleGrid>
      </Flex>
    </Container>
    </>
  );
};

export default Home;
