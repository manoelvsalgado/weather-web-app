import { Box, Text, HStack } from "@chakra-ui/react";
import { WeatherData } from "../../types/types";

interface WeatherInfoProps {
  weatherInfo: string[];
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weatherInfo, weatherData, loading, error }) => {

  const details = weatherData
    ? {
        windSpeed: `${weatherData.current.wind_kph} km/h`,
        sunrise: weatherData.forecast.forecastday[0].astro.sunrise,
        sunset: weatherData.forecast.forecastday[0].astro.sunset,
        humidity: `${weatherData.current.humidity}%`,
      }
    : null;

  const infoKeyMap: Record<string, string> = {
    "wind speed": "windSpeed",
    sunrise: "sunrise",
    sunset: "sunset",
    humidity: "humidity",
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <HStack width="100%" textAlign="center" p={4} gap={3} justify="center" flexWrap="wrap">
      {weatherInfo.map((info, index) => (
        <Box key={index} p={3} flex="1 1 140px" maxW="220px" textAlign="center">
          <Text fontSize="lg" fontWeight="bold">{info}</Text>
          <Text fontSize="md"> {details?.[infoKeyMap[info.toLowerCase()] as keyof typeof details] ?? "N/A"}
          </Text>
        </Box>
      ))}
    </HStack>
  );
};

export default WeatherInfo;


