import {
  ConnectWallet,
  MediaRenderer,
  useContract,
  useMetadata,
  useAddress,
  useContractRead,
  Web3Button,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
// import styles from "../styles/Home.module.css";
import {
  Container,
  Flex,
  Box,
  SimpleGrid,
  Heading,
  Skeleton,
  Text,
  Stack,
} from "@chakra-ui/react";

const Home: NextPage = () => {
  const address = useAddress();
  const contractAddress = "0xbC1dE8684e47aBc14eeD008ec1f9C54b600bCec7";
  const { contract } = useContract(contractAddress);
  const { data: metadata, isLoading: isLoadingMetadata } =
    useMetadata(contract);
  const { data: totalMinted, isLoading: isLoadingTotalMinted } =
    useContractRead(contract, "totalMinted");

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
                <MediaRenderer src={(metadata as { image: string })?.image} />
              </Skeleton>
            </Box>
            <Flex direction={"column"} justifyContent={"center"}>
              <Stack direction={"column"} spacing={4}>
                <Skeleton isLoaded={!isLoadingMetadata}>
                  <Heading>{(metadata as { name?: string })?.name}</Heading>
                </Skeleton>
                <Skeleton isLoaded={!isLoadingMetadata}>
                  <Text>
                    {(metadata as { description?: string })?.description}
                  </Text>
                </Skeleton>
                <Skeleton isLoaded={!isLoadingTotalMinted}>
                  <p>Total Minted: {totalMinted?.toNumber()}/7</p>
                </Skeleton>
                {address ? (
                  <Web3Button
                    contractAddress={contractAddress}
                    action={(contract) => contract.erc721.claim(1)}
                  >
                    Claim
                  </Web3Button>
                ) : (
                  <Text>Please connect your wallet anon</Text>
                )}
              </Stack>
            </Flex>
          </SimpleGrid>
        </Flex>
      </Container>
    </>
  );
};

export default Home;
