import { ConnectWallet, MediaRenderer, useContract, useMetadata, useContractRead } from "@thirdweb-dev/react";
import type { NextPage } from "next";
// import styles from "../styles/Home.module.css";
import { Container, Flex, Box, SimpleGrid, Heading, Skeleton, Text } from "@chakra-ui/react";

const Home: NextPage = () => {
  const contractAddress = "0xbC1dE8684e47aBc14eeD008ec1f9C54b600bCec7";
  const { contract } = useContract(contractAddress);
  const {data: metadata, isLoading: isLoadingMetadata} = useMetadata(contract);
  const {data: totalMinted, isLoading: isLoadingTotalMinted} = useContractRead(contract, "totalMinted");

  return (
    <>
    <Container>
      <Flex p={"20px"} justifyContent={"space-between"}>
        <Box></Box>
        <ConnectWallet />
      </Flex>
      <Flex h={"90vh"} alignItems={"center"} justifyContent={"center"}>
        <SimpleGrid columns={2} spacing={10} justifyItems={"center"}>
          <Box>
            <Skeleton isLoaded={!isLoadingMetadata}>
              <MediaRenderer src={(metadata as {image: string})?.image} />
            </Skeleton>
          </Box>
          <Flex direction={"column"}>
            <Skeleton isLoaded={!isLoadingMetadata}>
              <Heading>{(metadata as {name?: string})?.name}</Heading>
              </Skeleton>
            <Skeleton isLoaded={!isLoadingMetadata}>
              <Text>{(metadata as {description?: string})?.description}</Text>
              </Skeleton>
          </Flex>
          </SimpleGrid>
      </Flex>
    </Container>
    </>
  );
};

export default Home;
