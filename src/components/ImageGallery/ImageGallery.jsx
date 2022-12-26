import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ imageGallery, data }) => (
  <ul className={css.ImageGallery}>
    {data.map(image => (
      <ImageGalleryItem imageInfo={image} key={image.id} />
    ))}
  </ul>
);
