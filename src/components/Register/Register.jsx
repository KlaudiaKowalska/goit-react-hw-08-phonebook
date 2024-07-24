import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";

const Register = () => {
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://connections-api.goit.global/users/signup",
        state,
      );
      navigate("/login");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : error.message,
      );
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="8">
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
