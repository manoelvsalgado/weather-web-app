import { Box, Button, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import WeatherInfo from "../../components/weatherInfoCard";
import ShiftCard from "../../components/hourlyWeatherCard";
import CurrentTemperature from "../../components/currentWeatherCard";
import { useWeatherData } from "../../utils/weatherData";
import { useWeatherStyles } from "../../utils/weatherTheme";


const City: React.FC = () => {
  const shifts = ["Dawn", "Morning", "Afternoon", "Night"];
  const weatherInfo = ["Wind Speed", "Sunrise", "Sunset", "Humidity"];
  const navigate = useNavigate();
  const { name } = useParams();
  const { weatherData, loading, error } = useWeatherData(name);
  const temp = weatherData?.current?.temp_c ?? null;
  const { backgroundColor, textColor } = useWeatherStyles(temp);
  
  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg={backgroundColor}
      color={textColor}
      p={6}
    >
      <VStack padding={6} width="100%" maxW="1000px" textAlign="center">
        <CurrentTemperature cityName={name} weatherData={weatherData} loading={loading} error={error} />
        <ShiftCard shifts={shifts} weatherData={weatherData} loading={loading} error={error} />
        <WeatherInfo weatherInfo={weatherInfo} weatherData={weatherData} loading={loading} error={error} />
        
        <Button 
          background={backgroundColor}
          color={textColor}
          onClick={() => navigate(-1)}
        >
          Go back
        </Button>
      </VStack>
    </Box>
  );
};

export default City;