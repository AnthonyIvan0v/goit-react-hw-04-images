import { Component } from 'react';

import Searchbar from 'modules/Searchbar/Searchbar';
import ImageGallery from 'modules/ImageGallery/ImageGallery';
import ImageGalleryItem from 'modules/ImageGalleryItem/ImageGalleryItem';
import Modal from 'shared/Modal/Modal';
import Loader from 'modules/Loader/Loader';
import Button from 'modules/Button/Button';

import styles from './app.module.css';
import { searchImages } from 'shared/services/image-api';

class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    search: '',
    page: 1,
    showModal: false,
    urlLargeImage: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }
  searchImagesInput = ({ search }) => {
    this.setState({ search, images: [], page: 1 });
  };

  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const hits = await searchImages(search, page);
      this.setState(({ images }) => ({ images: [...images, ...hits] }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showLargeImage = largeImageURL => {
    this.setState({
      urlLargeImage: largeImageURL,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      urlLargeImage: null,
      showModal: false,
    });
  };
  render() {
    const { images, loading, showModal, urlLargeImage } = this.state;
    const { loadMore, closeModal, showLargeImage, searchImagesInput } = this;
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
        {showModal && (
          <Modal close={closeModal} urlLargeImage={urlLargeImage} />
        )}
      </div>
    );
  }
}

export default App;
