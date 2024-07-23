import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Contacts from "./Contacts/Contacts";
import Navigation from "./Navigation/Navigation";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import styles from "./App.module.scss";

const App = () => {
  return (
    <Router basename="/goit-react-hw-08-phonebook">
      {" "}
      {/* Bazowa ścieżka */}
      <div className={styles.app}>
        <Navigation />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <Contacts />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
