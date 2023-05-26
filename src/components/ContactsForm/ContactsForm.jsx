import PropTypes from 'prop-types';
import css from './ContactsForm.module.css';
import { useState } from 'react';

function ContactsForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = event => {
    setName(event.currentTarget.value);
  };

  const handleNumberChange = event => {
    setNumber(event.currentTarget.value);
  };

  const handleOnSubmit = event => {
    event.preventDefault();

    onSubmit({ name, number });

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleOnSubmit} className={css.form}>
      <label htmlFor="" className={css.form__label}>
        Name
        <input
          type="text"
          name="name"
          className={css.form__input}
          value={name}
          pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Enter name"
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="" className={css.form__label}>
        Number
        <input
          type="tel"
          name="number"
          className={css.form__input}
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Enter phone number"
          onChange={handleNumberChange}
        />
      </label>
      <button type="submit" className={css.form__button}>
        Add contact
      </button>
    </form>
  );
}

ContactsForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};

export default ContactsForm;
