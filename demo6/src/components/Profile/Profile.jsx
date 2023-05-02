import {
  Container,
  Heading,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { singleUserGetFunc } from "../../services/Apis";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { BsDownload } from "react-icons/bs";



const Profile = () => {
  const [userProfile, setUserProfile] = useState({});


  const toast = useToast();

  const { id } = useParams();
  // console.log(id);

  const userProfileGet = async () => {
    const data = await singleUserGetFunc(id);
    if (data.status === 200) {
      setUserProfile(data.data);
    } else {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    userProfileGet();
  });

  const downloadFile = async (url) => {
    // console.log(url);

    const fileName = `document`;
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  }


  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent={"center"}
        alignItems={"center"}
        p={3}
        bg="#BBBBB6"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Card align="center">
          <CardHeader>
            <Heading size="md">
              {userProfile.firstname} {userProfile.lastname}
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack>
              <Text as="samp">Age: {userProfile.age}</Text>
              <Text as="samp">Email: {userProfile.email}</Text>
              <Text as="samp">Salary: {userProfile.salary}</Text>
              <Text as="samp">Country: {userProfile.country}</Text>
              <Text as="samp">State: {userProfile.state}</Text>
              <Text as="samp">City: {userProfile.city}</Text>
              <Button colorScheme={null} onClick={() => { downloadFile(userProfile.document) }}>
                <Text as="samp" fontStyle={"normal"} >Download Document </Text>
                <BsDownload />
              </Button>
            </VStack>
          </CardBody>
          <CardFooter>

            <NavLink to={`/edit/${userProfile._id}`}>
              <Button colorScheme={"orange"}>
                Update Profile
              </Button>
            </NavLink>

          </CardFooter>
        </Card>
      </Box>
    </Container>
  );
};

export default Profile;
