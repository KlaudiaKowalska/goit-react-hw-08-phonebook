import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import styles from "./ContactForm.module.scss";

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
      alert("Nieprawidłowy format numeru telefonu.");
      return;
    }

    dispatch(
      addContact({
        name: state.name.trim(),
        number: state.number.trim(),
      }),
    );
    setState({ name: "", number: "" });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={styles.paragraphForm}>Imię</p>
      <input
        type="text"
        name="name"
        value={state.name}
        onChange={handleChange}
        placeholder="Imię"
        pattern="^[a-zA-Zа-яА-Я '-]+$"
        title="Imię może zawierać tylko litery, apostrof, myślnik i spacje. Na przykład Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <p className={styles.paragraphForm}>Numer</p>
      <input
        type="tel"
        name="number"
        value={state.number}
        onChange={handleChange}
        inputMode="numeric"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Numer telefonu musi być cyfrą i może zawierać spacje, myślniki, nawiasy i może zaczynać się od +"
        placeholder="Numer Telefonu"
        required
      />
      <button type="submit" className={styles.buttonForm}>
        Dodaj Kontakt
      </button>
    </form>
  );
};

export default ContactForm;
