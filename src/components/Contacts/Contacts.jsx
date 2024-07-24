import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, fetchContacts } from "../../redux/contactsSlice";
import Filter from "../Filter/Filter";
import ContactList from "../ContactList/ContactList";
import { Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";

const Contacts = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contacts.some((contact) => contact.name === name)) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(addContact({ name, number }));
      setName("");
      setNumber("");
    }
  };

  React.useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Box maxW="md" mx="auto" mt="8">
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Number</FormLabel>
          <Input
            type="tel"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Number"
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Add Contact
        </Button>
      </form>
      <Filter />
      <ContactList />
    </Box>
  );
};

export default Contacts;
