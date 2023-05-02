import {
  Box,
  Input,
  Container,
  HStack,
  Button,
  Text,
  FormControl,
  Flex,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import Tables from "../components/Tables/Tables";
import { useEffect, useState } from "react";
import { userGetFunc, deleteFunc } from "../services/Apis";
import { useToast } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const SearchPage = () => {
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const toast = useToast();

  const pages = (p) => {
    setPage(p);
  };

  const userGet = async () => {
    const data = await userGetFunc(search, page);
    if (data.status === 200) {
      setUserData(data.data.usersdata);
      setPageCount(data.data.pagination.pageCount);
      console.log(data.data.pagination.pageCount);
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

  const deleteUser = async (id) => {
    const data = await deleteFunc(id);
    if (data.status === 200) {
      setUserData(data.data);
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
    userGet();
  }, [search, page]);

  return (
    <Container maxW="xxl" centerContent>
        <Box
          pos = "absolute"
          p={3}
          w="100%"
          m="10px 0 10px 0"
          maxW={"xxl"}
        >
          <NavLink to={`/`}>
            <Button colorScheme="teal" width="10%">
              <HStack>
                <FiLogOut />
                <Text>Logout</Text>
              </HStack>
            </Button>
          </NavLink>
        </Box>
      <Box
        d="flex"
        justifyContent={"center"}
        alignItems={"center"}
        p={3}
        bg="white"
        w="100%"
        m="20px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        maxW={"xl"}
      >
        <FormControl>
          <HStack spacing="24px">
            <Input
              bordercolor="#bbbbb6"
              placeholder="Search by Name and Email"
              size="md"
              width="120%"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button colorScheme="teal" width="30%">
              <HStack>
                <Search2Icon />
                <Text>Search</Text>
              </HStack>
            </Button>
          </HStack>
        </FormControl>
      </Box>

      <Box
        justifyContent={"center"}
        alignItems={"center"}
        p={3}
        bg="white"
        w="100%"
        m="20px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        maxW={"xxl"}
      >
        <Tables
          userdata={userData}
          deleteuser={deleteUser}
          pages={pages}
          pageCount={pageCount}
        />
      </Box>
    </Container>
  );
};

export default SearchPage;
