import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import ContactsForm from 'components/ContactsForm/ContactsForm';
import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter/Filter';

function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const findName = name.toLocaleLowerCase().trim();
    const existContact = contacts.some(
      contact => contact.name.toLocaleLowerCase().trim() === findName
    );

    if (existContact) {
      alert(`${name} is already in contacts!`);
    } else {
      setContacts(prevContacts => [contact, ...prevContacts]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContact = () => {
    const normalazedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalazedFilter)
    );
  };

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = getVisibleContact();

  return (
    <section className={css.content}>
      <div className={css.content__container}>
        <h1>Phonebook</h1>
        <ContactsForm onSubmit={addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />

        <ContactsList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </div>
    </section>
  );
}

export default App;
