import { useState } from 'react';
import css from '../SearchBar/SearchBar.module.css';
import { HiSearchCircle } from 'react-icons/hi';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmitForm }) => {
  const [gallerySearchValue, setValue] = useState('');

  const changeValue = e => {
    const { value } = e.target;
    setValue(value);
  };
  const submitForm = e => {
    e.preventDefault();
    if (gallerySearchValue === '') {
      alert('fdsafda');
      return;
    }
    onSubmitForm(gallerySearchValue);
  };
  return (
    <header className={css.Searchbar}>
      <form onSubmit={submitForm} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <HiSearchCircle className={css.IconSearch} />
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          name="gallerySearchValue"
          placeholder="Search images and photos"
          onChange={changeValue}
          value={gallerySearchValue}
        />
      </form>
    </header>
  );
};
SearchBar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
