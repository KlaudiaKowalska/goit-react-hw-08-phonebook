import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginSuccess } from "../../redux/authSlice";
import { Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";

const Login = () => {
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://connections-api.goit.global/users/login",
        state,
      );
      const token = response.data.token;

      try {
        const jwtDecodeModule = await import("jwt-decode");
        const jwtDecode = jwtDecodeModule.default || jwtDecodeModule.jwtDecode;
        if (typeof jwtDecode !== "function") {
          throw new Error("jwtDecode is not a function");
        }
        const user = jwtDecode(token);
        dispatch(loginSuccess({ token, user }));
        navigate("/contacts");
      } catch (jwtError) {
        console.error("Error decoding JWT:", jwtError);
        alert("Failed to decode JWT. Please try again.");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message,
      );
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="8">
      <form onSubmit={handleSubmit}>
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
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
