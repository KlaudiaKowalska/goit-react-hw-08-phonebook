import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";
import { Box, Flex, Button } from "@chakra-ui/react";

const Navigation = () => {
  const isLoggedIn = useSelector((state) => state.auth.token);

  return (
    <Flex
      as="nav"
      p="4"
      bg="teal.500"
      color="white"
      justifyContent="space-between">
      <Box>
        <Button colorScheme="teal" variant="outline" mr="4">
          <Link to="/contacts">Contacts</Link>
        </Button>
      </Box>
      <Box>
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <>
            <Link to="/login">
              <Button colorScheme="teal" variant="outline" mr="4">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button colorScheme="teal" variant="outline">
                Register
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Navigation;
