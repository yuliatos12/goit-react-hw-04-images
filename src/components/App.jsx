import { useState, useEffect } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPhoto, handleFetchError } from "./service/pixabay.api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import css from "./App.module.css"

export const paramsForNotify = {
  position: 'right',
  timeout: 3000,
  width: '400px',
  fontSize: '24px'
};
const perPage = 12;

export const App = () => {
  const [search, setSearch] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [btnLoadMore, setBtnLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    };
    addPhotoPage(search, page);
  }, [search, page]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchValue = form.search.value
      .trim()
      .toLowerCase()
      .split(' ')
      .join('+');;
    
    if (searchValue === '') {
      Notify.info('Enter your request, please!', paramsForNotify);
      return;
    };

    if (searchValue === search) {
      Notify.info('Enter new request, please!', paramsForNotify);
      return;
    };

    setSearch(searchValue);
    setPage(1);
    setPhotos([]);
  };

  const addPhotoPage = (search, page) => {
    setLoading(true);

    fetchPhoto(search, page, perPage)
      .then(data => {
        const { totalHits } = data;
        const totalPage = Math.ceil(data.totalHits / perPage);
        if (totalHits === 0) {
          return Notify.failure('Sorry, there are no images matching your search query. Please try again.', paramsForNotify);
        }

        const arrPhotos = data.hits.map(({ id, webformatURL, largeImageURL, tags }) => (
          { id, webformatURL, largeImageURL, tags }
        ));
        
        setPhotos(prevPhotos => [...prevPhotos, ...arrPhotos]);
        
        if (totalPage > page) {
          setBtnLoadMore(true);
        } else {
          Notify.info("We're sorry, but you've reached the end of search results.", paramsForNotify);
          setBtnLoadMore(false);
        };
      })
      .catch(handleFetchError)
      .finally(() => setLoading(false));
  };

  const handleClickRender = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = (event) => {
    const imageId = event.target.getAttribute('data-id');
    const selectedPhoto = photos.find(photo => 
      photo.id === Number(imageId));
    setSelectedPhoto(selectedPhoto);

    toggleModal();
  }

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };
  
  return (
      <div>
        <Searchbar handleSearchSubmit={handleSearchSubmit} />
        {loading && <Loader />}
        <div className={css.container}>
          <ImageGallery photos={photos} handleImageItemClick={handleOpenModal} />
        </div>
        {photos.length !== 0 && btnLoadMore && <Button handleClickRender={handleClickRender} />}
        {showModal && <Modal selectedPhoto={selectedPhoto} onClose={toggleModal} />}
      </div>
    );
};




