import React, {useEffect} from 'react';
import css from './ContactList.module.css';
import Contact from './Contact';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/contacts/contactsOperations';

const ContactList = () => {
  const contacts = useSelector(state => state.contacts.items);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);
  const filter = useSelector(state => state.filter);

  const dispatch = useDispatch();

  useEffect(() => {
     dispatch(fetchContacts());
  }, [dispatch]);

  
  const filteredList = () => contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.phone.includes(filter)
  );

  return (
    <ul className={css.ul}>
      {isLoading && <b>Loading...</b>}
      {error && <b>{error}</b>}
      {contacts.length > 0 && filteredList().map(contact => {
        return <Contact key={contact.id} contact={contact} />;
      })}
    </ul>
  );
};

export default ContactList;
