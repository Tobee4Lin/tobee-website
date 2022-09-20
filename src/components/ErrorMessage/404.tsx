import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <Box mt="100">
      <Box
        mb="4"
        as="h4"
        fontWeight="semibold"
        lineHeight="tight"
        flexWrap="wrap"
      >
        <Text fontSize="xl">Sorry, the page you visited does not exist.</Text>
      </Box>

      <Box>
        <Button colorScheme="teal" size="sm" onClick={goHome}>
          Back Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
