import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import css from 'App.module.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

import { getImages } from 'Services/api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [largeImgUrl, setLargeImgUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!imageName) return;
    setLoading(true);
    getImages(imageName, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          setError('No images');
          return;
        }
        setImages(images => [...images, ...hits]);
        setShowBtn(page < Math.ceil(totalHits / 12));
      })
      .catch(() => setError('Something wrong'))
      .finally(() => setLoading(false));
  }, [page, imageName]);

  useEffect(() => {
    if (!error) return;
    toast.info(error);
    setError('');
  }, [error]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const onSubmitSearch = searchRequesr => {
    if (imageName === searchRequesr) {
      setError('The same search query');
      return;
    }
    setImageName(searchRequesr);
    setImages([]);
    setPage(1);
    setShowBtn(false);
  };

  const onImageClick = largeImgUrl => {
    setLargeImgUrl(largeImgUrl);
  };
  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmitSearch} />

      {loading && <Loader />}

      {images.length > 0 && (
        <ImageGallery data={images} onImageClick={onImageClick} />
      )}

      {images.length > 0 && showBtn && !loading && (
        <Button onClick={loadMore} />
      )}

      {largeImgUrl && (
        <Modal largeImgUrl={largeImgUrl} onImageClick={onImageClick} />
      )}

      <ToastContainer autoClose={3000} />
    </div>
  );
};
