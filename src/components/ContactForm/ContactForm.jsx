import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { Box, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";

const ContactForm = () => {
  const [state, setState] = useState({ name: "", number: "" });
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      const filteredValue = value.replace(/[^\d+\-().\s]/g, "");
      setState((prevState) => ({ ...prevState, [name]: filteredValue }));
    } else {
      setState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const validatePhoneNumber = (number) => {
    const phoneNumberPattern =
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    return phoneNumberPattern.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === state.name.toLowerCase(),
    );

    if (isDuplicate) {
      alert(`${state.name} jest już w kontaktach.`);
      return;
    }

    if (state.name.trim() === "" || state.number.trim() === "") {
      alert("Imię i numer nie mogą być puste.");
      return;
    }

    if (!validatePhoneNumber(state.number)) {
      alert(
        "Numer telefonu jest nieprawidłowy. Upewnij się, że używasz poprawnego formatu.",
      );
      return;
    }

    dispatch(addContact(state));
    setState({ name: "", number: "" });
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      maxW="sm"
      margin="auto"
      mt="5"
      p="5"
      borderWidth="1px"
      borderRadius="lg">
      <FormControl>
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
      <FormControl mt="4">
        <FormLabel>Number</FormLabel>
        <Input
          type="tel"
          name="number"
          value={state.number}
          onChange={handleChange}
          placeholder="Number"
          required
        />
      </FormControl>
      <Button type="submit" colorScheme="teal" mt="4" width="full">
        Add contact
      </Button>
    </Box>
  );
};

export default ContactForm;
