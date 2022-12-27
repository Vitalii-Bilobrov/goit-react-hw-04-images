import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class Searchbar extends Component {
  state = {
    imageName: '',
  };
  handleNameChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };
  handleNameSubmit = event => {
    event.preventDefault();
    if (this.state.imageName.trim() === '') {
      toast.info('Please whrite a name of image');
      // alert('Please whrite a name of image');
      return;
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleNameSubmit} className={css.SearchForm}>
          <button type="submit" className={css.Button}>
            <span className={css.ButtonLabel}>Search</span>
          </button>

          <input
            className={css.Input}
            name="imageName"
            value={this.state.imageName}
            onChange={this.handleNameChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
