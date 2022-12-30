//import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Component } from 'react';
// import { Searchbar } from './Searchbar/Searchbar';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Button } from './Button/Button';
// import { getImages } from 'Services/api';
// import { Modal } from './Modal/Modal';
// import { Loader } from './Loader/Loader';
// import css from 'App.module.css';

// export class App extends Component {
//   state = {
//     images: [],
//     loading: false,
//     showBtn: false,
//     imageName: '',
//     page: 1,
//     largeImgUrl: '',
//     error: '',
//   };

//   componentDidUpdate(_, prevState) {
//     const { imageName, page, error } = this.state;

//     if (imageName !== prevState.imageName || page !== prevState.page) {
//       this.setState({ loading: true });
//       getImages(imageName, page)
//         .then(({ hits, totalHits }) => {
//           if (hits.length === 0) {
//             this.setState({ error: 'No images' });
//             return;
//           }
//           this.setState(prevState => ({
//             images: [...prevState.images, ...hits],
//             showBtn: page < Math.ceil(totalHits / 12),
//             error: '',
//           }));
//         })
//         .catch(() => this.setState({ error: 'Something wrong' }))
//         .finally(() => this.setState({ loading: false }));
//     }
//     if (prevState.error !== error) {
//       if (!error) return;
//       toast.info(error);
//     }
//   }

//   loadMore = () => {
//     this.setState(({ page }) => {
//       return {
//         page: page + 1,
//       };
//     });
//   };

//   onSubmitSearch = imageName => {
//     this.setState({ imageName, images: [], page: 1 });
//   };
//   onImageClick = largeImgUrl => {
//     this.setState({ largeImgUrl });
//   };
//   render() {
//     const { images, loading, largeImgUrl, showBtn } = this.state;
//     return (
//       <div className={css.App}>
//         <Searchbar onSubmit={this.onSubmitSearch} />

//         {loading && <Loader />}

//         {images.length > 0 && (
//           <ImageGallery data={images} onImageClick={this.onImageClick} />
//         )}

//         {images.length > 0 && showBtn && !loading && (
//           <Button onClick={this.loadMore} />
//         )}

//         {largeImgUrl && (
//           <Modal largeImgUrl={largeImgUrl} onImageClick={this.onImageClick} />
//         )}

//         <ToastContainer autoClose={3000} />
//       </div>
//     );
//   }
// }
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { getImages } from 'Services/api';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import css from 'App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [largeImgUrl, setLargeImgUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getImages(imageName, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          setError('No images');
          return;
        }
        setImages(images => [...images, ...hits]);
        setShowBtn(page < Math.ceil(totalHits / 12));
        setError('');
      })
      .catch(error => setError('Something wrong'))
      .finally(() => setLoading(false));
  }, [images, page, imageName]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const onSubmitSearch = imageName => {
    setImageName(imageName);
    setImages([]);
    setLargeImgUrl('');
    setPage(1);
    setError('');
    setShowBtn(false);
    setLoading(false);
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
