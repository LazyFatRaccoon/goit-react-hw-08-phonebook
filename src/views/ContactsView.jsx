import React from 'react';
import AddContactForm from 'components/AddContactForm';
import ContactFilter from 'components/ContactFilter';
import ContactList from 'components/ContactList';

export default function ContactsView() {
  return (
    <>
      <h1 style={{ margin: '0px' }}>Phonebook</h1>
      <AddContactForm />
      <ContactFilter />
      <h2 style={{ margin: '0px' }}>Contact list</h2>
      <ContactList />
    </>
  );
}
