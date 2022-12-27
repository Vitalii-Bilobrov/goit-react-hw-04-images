import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ onImageClick, imageInfo }) => (
  <li className={css.GalleryItem}>
    <img
      className={css.ImageGalleryImage}
      src={imageInfo.webformatURL}
      alt={imageInfo.tag}
      onClick={() => onImageClick(imageInfo.largeImageURL)}
    />
  </li>
);
