import AddContactForm from './AddContactForm';
import { Component } from 'react';
import ContactList from './ContactList'
import ContactFilter from './ContactFilter'
import uniqid from 'uniqid'

// const shortid = require('shortid');
const LS_CONTACTS = 'contacts'

class App extends Component {
  state = {
    contacts: [
      { id: uniqid(), name: 'Rosie Simpson', telephone: '459-12-56' },
      { id: uniqid(), name: 'Hermione Kline', telephone: '443-89-12' },
      { id: uniqid(), name: 'Eden Clements', telephone: '645-17-79' },
      { id: uniqid(), name: 'Annie Copeland', telephone: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem(LS_CONTACTS);
    if (savedContacts) {
      this.setState({contacts: JSON.parse(savedContacts)})
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(LS_CONTACTS, JSON.stringify(this.state.contacts))
    }
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  }
  addContact = contact => {
    this.setState(prevState => ({
      contacts: [
        {
          id: uniqid(),
          name: contact.name,
          telephone: contact.telephone,
        },
        ...prevState.contacts,
      ],
    }));
  };
  filterContacts = filter => {
    this.setState({filter: filter})
  }

  render() {
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
        <h1 style={{margin: '0px'}}>Phonebook</h1>
        <AddContactForm onSubmit={this.addContact} />
        <ContactFilter onFilterChange={this.filterContacts} />
        <h2 style={{margin: '0px'}}>Contact list</h2>
        <ContactList contacts={this.state.contacts} filter={this.state.filter} onDeleteContact={this.deleteContact}/>
      </div>
    );
  }
}

export default App;
