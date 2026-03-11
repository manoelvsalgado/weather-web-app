import { Box, Text, HStack } from "@chakra-ui/react";
import { WeatherData } from "../../types/types";
interface HourlyWeather {
  shift: string;
  temp: number | null;
  icon: string;
}

interface ShiftsProps {
  shifts: string[];
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const Shifts: React.FC<ShiftsProps> = ({ shifts, weatherData, loading, error }) => {

  const hours = [3, 9, 15, 21];
  const hourlyWeather: HourlyWeather[] = weatherData
    ? hours.map((hour, index) => ({
        shift: shifts[index],
        temp: weatherData.forecast.forecastday[0].hour[hour]?.temp_c ?? null,
        icon: weatherData.forecast.forecastday[0].hour[hour]?.condition?.icon ?? "",
      }))
    : [];

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <HStack width="100%" textAlign="center" p={4} gap={3} justify="center" flexWrap="wrap">
      {hourlyWeather.map((weather, index) => (
        <Box key={index} p={3} borderRadius="md" flex="1 1 140px" maxW="220px" textAlign="center">
          <Text fontSize="lg" fontWeight="bold">{weather.shift}</Text>
          {weather.icon && <Text fontSize="32px">{weather.icon}</Text>}
          <Text fontSize="md">{weather.temp !== null ? `${weather.temp}°C` : "N/A"}</Text>
        </Box>
      ))}
    </HStack>
  );
};

export default Shifts;

