import {
  Box,
  Center,
  Container,
  Text,
} from "@chakra-ui/react";
import Form from "../components/Form/Form";
import { useParams } from "react-router-dom";

const EditPage = () => {

  const { id } = useParams();
  // console.log(id);


  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent={"center"}
        alignItems={"center"}
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Center>
          <Text fontSize="4xl" fontFamily="Work sans">
            Edit Profile
          </Text>
        </Center>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Form id={id} />
      </Box>
    </Container>
  );
};

export default EditPage;
