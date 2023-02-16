import { useState, useEffect, useCallback } from 'react';

import Searchbar from 'modules/Searchbar/Searchbar';
import ImageGallery from 'modules/ImageGallery/ImageGallery';
import ImageGalleryItem from 'modules/ImageGalleryItem/ImageGalleryItem';
import Modal from 'shared/Modal/Modal';
import Loader from 'modules/Loader/Loader';
import Button from 'modules/Button/Button';

import styles from './app.module.css';
import { searchImages } from 'shared/services/image-api';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [urlLargeImage, setUrlLargeImage] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }
    const fetchImages = async () => {
      try {
        setLoading(true);
        const hits = await searchImages(search, page);
        setImages(prevImages => [...prevImages, ...hits]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [search, page]);

  const searchImagesInput = useCallback(({ search }) => {
    setSearch(search);
    setImages([]);
    setPage(1);
  }, []);

  const showLargeImage = largeImageURL => {
    setUrlLargeImage(largeImageURL);
    setShowModal(true);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setUrlLargeImage(null);
    setShowModal(false);
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={searchImagesInput} />
      {Boolean(images.length) ? (
        <ImageGallery>
          <ImageGalleryItem images={images} showLargeImage={showLargeImage} />
        </ImageGallery>
      ) : (
        <p className={styles.message}>Enter your query in the search box</p>
      )}
      {loading && <Loader />}
      {Boolean(images.length) && <Button loadMore={loadMore} />}
      {showModal && <Modal close={closeModal} urlLargeImage={urlLargeImage} />}
    </div>
  );
};

export default App;
