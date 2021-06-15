import { ImSearch } from 'react-icons/im';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [filmName, setFilmName] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (filmName.trim() === '') {
      toast('Please enter search query');
      return;
    }

    onSubmit(filmName);

    setFilmName('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <input
          value={filmName}
          onChange={event =>
            setFilmName(event.currentTarget.value.toLowerCase())
          }
          className={s.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search films"
        />
        <button type="submit" className={s.searchFormButton}>
          <ImSearch />
        </button>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
