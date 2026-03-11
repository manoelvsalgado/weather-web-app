import { Box, SimpleGrid } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface CityListProps {
    cities: string[];
}

const CityList: React.FC<CityListProps> = ({ cities }) => {
    return (
        <SimpleGrid columns={3} padding={3} width="100%" textAlign="center" p={3}>
            {cities.map((city, index) => (
                <Box
                    key={index}
                    p={3}
                    transition="transform 0.2s, background-color 0.2s"
                    _hover={{ bg: "gray.600", transform: "scale(1.05)" }}
                    width="100%"
                >
                    <RouterLink
                        to={`/city/${city}`}
                        style={{
                            color: "white",
                            fontSize: "1.125rem",
                            fontWeight: "bold",
                            textDecoration: "none"
                        }}
                    >
                        {city}
                    </RouterLink>
                </Box>
            ))}
        </SimpleGrid>
    );
};

export default CityList;
