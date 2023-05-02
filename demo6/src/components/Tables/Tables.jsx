import "./Tables.css";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  HStack,
  Text,
  Container,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Tables = ({ userdata, deleteuser, pages, pageCount }) => {
  function handlePageClick(page) {
    pages(page.selected + 1);
  }

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal" size="md">
        <TableCaption>
          <Container maxW="xl" centerContent>
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </Container>
        </TableCaption>
        <Thead>
          <Tr>
            <Th margin={"2px"}>NAME</Th>
            <Th margin={"2px"}>AGE</Th>
            <Th margin={"2px"}>EMAIL</Th>
            <Th margin={"2px"}>SALARY</Th>
            <Th margin={"2px"}>COUNTRY</Th>
            <Th margin={"2px"}>STATE</Th>
            <Th margin={"2px"}>CITY</Th>
            <Th margin={"2px"}>ACTION</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userdata.length > 0 ? (
            userdata.map((element) => {
              return (

                <Tr key={element._id}>
                  <Td>
                    {element.firstname} {element.lastname}
                  </Td>
                  <Td isNumeric>{element.age}</Td>
                  <Td >{element.email}</Td>
                  <Td isNumeric>{element.salary}</Td>
                  <Td >{element.country}</Td>
                  <Td >{element.state}</Td>
                  <Td >{element.city}</Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={Button}
                        bg={false}
                        _hover={false}
                        _active={false}
                      >
                        <BiDotsVerticalRounded />
                      </MenuButton>
                      <MenuList>
                        <NavLink to={`/profile/${element._id}`}>
                          <MenuItem>
                            <HStack>
                              <AiFillEye />
                              <Text>View Profile</Text>
                            </HStack>
                          </MenuItem>
                        </NavLink>
                        <NavLink to={`/edit/${element._id}`}>
                          <MenuItem>
                            <HStack>
                              <AiFillEdit />
                              <Text>Update</Text>
                            </HStack>
                          </MenuItem>
                        </NavLink>
                        <MenuItem onClick={() => deleteuser(element._id)}>
                          <HStack>
                            <AiFillDelete />
                            <Text> Delete</Text>
                          </HStack>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>

              );
            })
          ) : (
            <Tr>
              <Td>
                NO DATA FOUND
              </Td>
              <Td ></Td>
              <Td ></Td>
              <Td ></Td>
              <Td ></Td>
              <Td ></Td>
              <Td ></Td>
            </Tr>

          )}
        </Tbody>

      </Table>

    </TableContainer>
  );
};

export default Tables;
