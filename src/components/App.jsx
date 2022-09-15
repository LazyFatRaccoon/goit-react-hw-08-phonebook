import AddContactForm from './AddContactForm';
import { useState, useEffect } from 'react';
import ContactList from './ContactList'
import ContactFilter from './ContactFilter'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import uniqid from 'uniqid';


const LS_CONTACTS = 'contacts'
const data = [
  { id: uniqid(), name: 'Rosie Simpson', telephone: '459-12-56' },
  { id: uniqid(), name: 'Hermione Kline', telephone: '443-89-12' },
  { id: uniqid(), name: 'Eden Clements', telephone: '645-17-79' },
  { id: uniqid(), name: 'Annie Copeland', telephone: '227-91-26' },
]

export default function App() {
  
  const [contacts, setContacts] = useState(()=>{
    
      const savedContacts = localStorage.getItem(LS_CONTACTS);
      let initialState
      if (savedContacts) {
        initialState = (JSON.parse(savedContacts))
      } else initialState = data
      return initialState
      
  })
  const [filter, setFilter] = useState('')

  

  useEffect(()=>{
    localStorage.setItem(LS_CONTACTS, JSON.stringify(contacts))
  },[contacts])


  const deleteContact = contactId => {
    setContacts(prevState => (
      prevState.filter(
        contact => contact.id !== contactId
      )
    ));
  };

  const addContact = contact => {
    if (
      contacts.some(
        element => element.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      Notify.warning('we already got this contact');
      return;
    }
    setContacts(prevState => (
      [
        {
          id: uniqid(),
          name: contact.name,
          telephone: contact.telephone,
        },
        ...prevState,
      ]
    ));
  };

  const filterContacts = filter => {
    setFilter(filter)
  }

  const filteredContactsList = () => {
    const filteredList = contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.telephone.includes(filter)
    );
    return filteredList;
  };

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
          padding: '0px 50px', 
          gap: '20px'
        }}
      >
        <h1 style={{ margin: '0px' }}>Phonebook</h1>
        <AddContactForm onSubmit={addContact} />
        <ContactFilter
          filter={filter}
          onFilterChange={filterContacts}
        />
        <h2 style={{ margin: '0px' }}>Contact list</h2>
        <ContactList
          contacts={filteredContactsList()}
          onDeleteContact={deleteContact}
        />
      </div>
    );
  }



