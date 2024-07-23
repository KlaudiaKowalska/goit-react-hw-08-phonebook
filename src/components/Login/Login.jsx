import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.scss";
import { loginSuccess } from "../../redux/authSlice";

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
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="name"
        value={state.name}
        onChange={handleChange}
        placeholder="Name (optional)"
      />
      <input
        type="email"
        name="email"
        value={state.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={state.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
