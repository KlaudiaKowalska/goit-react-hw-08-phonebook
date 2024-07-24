import React from "react";
import PropTypes from "prop-types";
import { ListItem, Button, Box, Text } from "@chakra-ui/react";

const ContactListItem = ({ contact, removeContact }) => {
  return (
    <ListItem
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      display="flex"
      justifyContent="space-between"
      alignItems="center">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%">
        <Text fontWeight="bold">
          {contact.name}: {contact.number}
        </Text>
        <Button colorScheme="teal" onClick={removeContact}>
          Delete
        </Button>
      </Box>
    </ListItem>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  removeContact: PropTypes.func.isRequired,
};

export default ContactListItem;
