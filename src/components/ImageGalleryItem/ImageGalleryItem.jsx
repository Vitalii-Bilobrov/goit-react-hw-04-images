import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ imageGalleryItem, imageInfo }) => (
  <li className={css.GalleryItem}>
    <img
      className={css.ImageGalleryImage}
      src={imageInfo.userImageURL}
      alt={imageInfo.tag}
    />
  </li>
);
