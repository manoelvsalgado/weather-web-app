import { Box, Heading, Text, Image, VStack } from "@chakra-ui/react";
import globeIcon from "../../assets/icons/whiteGlobe.svg";
import CityList from "../../components/cityListCard/index";

const Home: React.FC = () => {
  const cities = ["Dallol", "Fairbanks", "London", "Recife", "Vancouver", "Yakutsk"];

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="gray.900"
      color="white"
      p={6}
    >
      <VStack padding={4} textAlign="center">
        <Heading fontSize="48px">Weather</Heading>
        <Text fontSize="32px" p={10} color="gray.400">Select a City</Text>
        <Image src={globeIcon} alt="Globe logo" height='200px'/>
        <CityList cities={cities} />
      </VStack>
    </Box>
  );
};

export default Home;

