import { ToastContainer } from 'react-toastify';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { getImages } from 'Services/api';
import { Modal } from './Modal/Modal';
import css from 'App.module.css';
import { Puff } from 'react-loader-spinner';

export class App extends Component {
  state = {
    images: [],
    loading: false,
    noResult: false,
    showBtn: false,
    imageName: '',
    page: 1,
    isEmpty: false,
    largeImgUrl: '',
  };

  componentDidUpdate(_, prevState) {
    const { imageName, page, per_page } = this.state;

    if (imageName !== prevState.imageName || page !== prevState.page) {
      this.setState({ loading: true });
      getImages(imageName, page)
        .then(({ hits, totalHits }) => {
          if (hits.length === 0) {
            this.setState({ isEmpty: true });
            return;
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            showBtn: page < Math.ceil(totalHits / per_page),
          }));
        })
        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  onSubmitSearch = imageName => {
    this.setState({ imageName, images: [], largeImgUrl: '' });
  };
  onImageClick = largeImgUrl => {
    console.log('largeImgUrl');
    this.setState({ largeImgUrl });
  };
  render() {
    const { images, loading, largeImgUrl } = this.state;
    return (
      <div className={css.App}>
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.onSubmitSearch} />

        {loading && (
          <div className={css.Puff}>
            <Puff
              height="80"
              width="80"
              radius={1}
              color="#4fa94d"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
        {images && <ImageGallery data={images} />}

        {images.length > 0 && <Button onClick={this.loadMore} />}
        {largeImgUrl && (
          <Modal largeImgUrl={largeImgUrl} onImageClick={this.onImageClick} />
        )}
      </div>
    );
  }
}
