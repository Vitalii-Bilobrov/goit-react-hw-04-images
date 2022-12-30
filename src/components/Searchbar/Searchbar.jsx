import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleNameChange = event =>
    setImageName(event.target.value.toLowerCase());

  const handleNameSubmit = event => {
    event.preventDefault();
    if (imageName.trim() === '') {
      toast.info('Please whrite a name of image');

      return;
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleNameSubmit} className={css.SearchForm}>
        <button type="submit" className={css.Button}>
          <span className={css.ButtonLabel}>Search</span>
        </button>

        <input
          className={css.Input}
          name="imageName"
          value={imageName}
          onChange={handleNameChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
