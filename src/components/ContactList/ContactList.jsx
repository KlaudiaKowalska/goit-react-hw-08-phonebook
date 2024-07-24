import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactListItem from "../ContactListItem/ContactListItem";
import { removeContact, fetchContacts } from "../../redux/contactsSlice";
import { List } from "@chakra-ui/react";

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <List spacing={3}>
      {filteredContacts.map((contact) => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          removeContact={() => dispatch(removeContact(contact.id))}
        />
      ))}
    </List>
  );
};

export default ContactList;
