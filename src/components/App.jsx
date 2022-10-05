import AddContactForm from './AddContactForm';
import { useState, useEffect } from 'react';
import ContactList from './ContactList'
import ContactFilter from './ContactFilter'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import uniqid from 'uniqid';
import {useSelector, useDispatch} from 'react-redux';
import { addContact, deleteContact, setFilter } from 'redux/store';



//const LS_CONTACTS = 'contacts'
// const data = [
//   { id: uniqid(), name: 'Rosie Simpson', telephone: '459-12-56' },
//   { id: uniqid(), name: 'Hermione Kline', telephone: '443-89-12' },
//   { id: uniqid(), name: 'Eden Clements', telephone: '645-17-79' },
//   { id: uniqid(), name: 'Annie Copeland', telephone: '227-91-26' },
// ]

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state=>state.contacts.contacts);
  console.log(contacts)
  const filter = useSelector(state=>state.filter);
  console.log(filter)

  // const [contacts, setContacts] = useState(()=>{
    
  //     const savedContacts = localStorage.getItem(LS_CONTACTS);
  //     let initialState
  //     if (savedContacts) {
  //       initialState = (JSON.parse(savedContacts))
  //     } else initialState = data
  //     return initialState
      
  // })
  // const [filter, setFilter] = useState('')

  

  // useEffect(()=>{
  //   localStorage.setItem(LS_CONTACTS, JSON.stringify(contacts))
  // },[contacts])

  

  const handleDeleteContact = contactId => {
    dispatch(deleteContact({id: contactId}));
  };

  const handleAddContact = contact => {
    if (
      contacts.some(
        element => element.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      Notify.warning('we already got this contact');
      return;
    }
    dispatch(addContact(
        {
          id: uniqid(),
          name: contact.name,
          telephone: contact.telephone,
        },
       
    ));
  };

  const filterContacts = filter => {
    dispatch(setFilter({filter: filter}))
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
        <AddContactForm onSubmit={handleAddContact} />
        <ContactFilter
          filter={filter}
          onFilterChange={filterContacts}
        />
        <h2 style={{ margin: '0px' }}>Contact list</h2>
        <ContactList
          contacts={filteredContactsList()}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    );
  }



