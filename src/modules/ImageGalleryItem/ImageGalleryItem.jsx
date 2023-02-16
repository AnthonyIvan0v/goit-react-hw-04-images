import PropTypes from 'prop-types';

import styles from './image-gallery-item.module.css';

const ImageGalleryItem = ({ images, showLargeImage }) => {
  const elements = images.map(({ id, webformatURL, largeImageURL }) => {
    return (
      <li
        className={styles.galleryItem}
        key={id}
        onClick={() => showLargeImage(largeImageURL)}
      >
        <img src={webformatURL} alt="" className={styles.galleryItemImage} />
      </li>
    );
  });

  return elements;
};

export default ImageGalleryItem;

ImageGalleryItem.defaultProps = {
  images: [],
};

ImageGalleryItem.propTypes = {
  showLargeImage: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
