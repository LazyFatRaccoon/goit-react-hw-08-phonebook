import React from 'react';
import css from './Contact.module.css';
import PropTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/contactsOperations';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  return (
    <li className={css.li}>
      <span>
        {contact.name} {contact.phone}{' '}
      </span>
      <button
        className={css.button}
        type="button"
        onClick={() => dispatch(deleteContact(contact.id))}
      >
        <FaTrashAlt className={css.icon} size={40} />
      </button>
    </li>
  );
};

Contact.propTypes = {
  contact: PropTypes.exact({
    createdAt: PropTypes.string,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Contact;
