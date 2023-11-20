import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact, setFilter } from './Contacts/contactsSlice';
import ContactForm from './Contacts/ContactForm';
import Filter from './Contacts/Filter';
import ContactList from './Contacts/ContactList';
import css from './Contacts/Contacts.module.css';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  function handleSubmit(name, number) {
    const contactExists = contacts.some(
      contact =>
        typeof contact.name === 'string' &&
        contact.name.toLowerCase() === name.toLowerCase()
    );

    if (contactExists) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact(name, number));
  }

  function handleDeleteContact(contactId) {
    dispatch(deleteContact(contactId));
  }

  function changeFilter(e) {
    dispatch(setFilter(e.target.value));
  }

  const filteredContacts = contacts.filter(
    contact =>
      typeof contact.name === 'string' &&
      contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <h2 className={css.title}>Contacts</h2>
      <Filter onChange={changeFilter} value={filter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteItem={handleDeleteContact}
      />
    </div>
  );
}
