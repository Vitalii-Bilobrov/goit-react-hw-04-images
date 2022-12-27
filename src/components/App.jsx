import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { getImages } from 'Services/api';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import css from 'App.module.css';

export class App extends Component {
  state = {
    images: [],
    loading: false,
    showBtn: false,
    imageName: '',
    page: 1,
    largeImgUrl: '',
    error: '',
  };

  componentDidUpdate(_, prevState) {
    const { imageName, page, per_page, error } = this.state;

    if (imageName !== prevState.imageName || page !== prevState.page) {
      this.setState({ loading: true });
      getImages(imageName, page)
        .then(({ hits, totalHits }) => {
          if (hits.length === 0) {
            this.setState({ error: 'No images' });
            return;
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            showBtn: page < Math.ceil(totalHits / 12),
            error: '',
          }));
        })
        .catch(() => this.setState({ error: 'Something wrong' }))
        .finally(() => this.setState({ loading: false }));
    }
    if (prevState.error !== error) {
      if (!error) return;
      toast.info(error);
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
    this.setState({ imageName, images: [], page: 1 });
  };
  onImageClick = largeImgUrl => {
    this.setState({ largeImgUrl });
  };
  render() {
    const { images, loading, largeImgUrl, showBtn } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmitSearch} />

        {loading && <Loader />}

        {images.length > 0 && (
          <ImageGallery data={images} onImageClick={this.onImageClick} />
        )}

        {images.length > 0 && showBtn && !loading && (
          <Button onClick={this.loadMore} />
        )}

        {largeImgUrl && (
          <Modal largeImgUrl={largeImgUrl} onImageClick={this.onImageClick} />
        )}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
