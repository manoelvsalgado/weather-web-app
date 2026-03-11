import { Box, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import { useWeatherStyles } from "../../utils/weatherTheme";
import { WeatherData } from "../../types/types";

interface CurrentTemperatureProps {
  cityName?: string;
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const CurrentTemperature: React.FC<CurrentTemperatureProps> = ({ cityName, weatherData, loading, error }) => {

  const temp = weatherData?.current?.temp_c ?? null;
  const maxTemp = weatherData?.forecast?.forecastday[0]?.day?.maxtemp_c ?? null;
  const minTemp = weatherData?.forecast?.forecastday[0]?.day?.mintemp_c ?? null;
  const text = weatherData?.current?.condition?.text ?? "";
  const icon = weatherData?.current?.condition?.icon ?? "";

  const { backgroundColor, textColor } = useWeatherStyles(temp);

  if (loading) {
    return <Text textAlign="center">Loading...</Text>;
  }

  if (error) {
    return <Text textAlign="center">{error}</Text>;
  }

  return (
    <Box width="100%" maxW="900px" p={{ base: 4, md: 8 }} bg={backgroundColor} color={textColor} borderRadius="md" textAlign="center">
      {temp !== null && (
        <>
          <Heading mb={{ base: 4, md: 6 }} fontSize={{ base: "32px", md: "48px" }}>{cityName}</Heading>
          <HStack justify='center' gap={{ base: 2, md: 8 }} flexDirection={{ base: "column", md: "row" }}>
            <Heading fontSize={{ base: "44px", md: "56px" }}>{temp}°C</Heading>
            <VStack gap={0}>
              <Text color='red'>↑ {maxTemp}°C</Text>
              <Text color='blue'>↓ {minTemp}°C</Text>
            </VStack>
          </HStack>
          <Text mt={{ base: 2, md: 4 }} fontSize={{ base: "24px", md: "32px" }}>{text}</Text>
          {icon && <Text mt={2} fontSize={{ base: "48px", md: "64px" }}>{icon}</Text>}
        </>
      )}
    </Box>
  );
};

export default CurrentTemperature;
