import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { Button, Text, Flex } from "@chakra-ui/react";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth.user.email);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Flex align="center">
      <Text mr="4">{email}</Text>
      <Button colorScheme="red" onClick={handleLogout}>
        Logout
      </Button>
    </Flex>
  );
};

export default UserMenu;
