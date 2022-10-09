import AddContactForm from './AddContactForm';
import ContactList from './ContactList';
import ContactFilter from './ContactFilter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import uniqid from 'uniqid';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/filter/filter';
import { addContact, deleteContact } from 'redux/contacts/contactsSlice';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter);

  const handleDeleteContact = contactId => {
    dispatch(deleteContact({ id: contactId }));
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
    dispatch(
      addContact({
        id: uniqid(),
        name: contact.name,
        telephone: contact.telephone,
      })
    );
  };

  const filterContacts = filter => {
    dispatch(setFilter({ filter: filter }));
  };

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
        gap: '20px',
      }}
    >
      <h1 style={{ margin: '0px' }}>Phonebook</h1>
      <AddContactForm onSubmit={handleAddContact} />
      <ContactFilter filter={filter} onFilterChange={filterContacts} />
      <h2 style={{ margin: '0px' }}>Contact list</h2>
      <ContactList
        contacts={filteredContactsList()}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
}
