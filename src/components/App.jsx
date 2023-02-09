import { LoadMoreButton } from './Button/Button';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { fetchItems } from 'services/api';
import { useEffect, useState } from 'react';
import { Loader } from './Loader/Loader';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

export const App = () => {
  // array for saving images on fetching form, and pressing loading button
  const [gallery, setGallery] = useState([]);

  // default page and hook for adding page for loading more images when submit 'Load more' button
  const [page, setPage] = useState(1);

  // value for fetching images for searchbar
  const [searchInputValue, setInputValue] = useState('');

  // set value for opening and closing modal
  const [showModal, setShowModal] = useState(false);

  // set loading animation for showing it for users while downloading images
  const [isLoading, setLoading] = useState(false);

  // set link on big image which will be showed in modal
  const [modalImage, setModalImage] = useState('');

  // set attr 'alt' for modal image
  const [modaltAltText, setModalAltText] = useState('');

  // set disabled attr for button while loading new images
  const [isDisabledBtn, setButtonStatus] = useState(false);

  const [isResponseFull, setStatusForResponse] = useState(false);
  useEffect(() => {
    // check if our search value is not an emty string
    if (searchInputValue === '') {
      return;
    }
    if (searchInputValue) {
      setLoading(true);
      setButtonStatus(true);
      setStatusForResponse(false);

      fetchItems(searchInputValue, page)
        .then(data => data.data)
        .then(r => {
          if (r.hits.length === 0) {
            toast.info('No images found');
            setStatusForResponse(true);
          }
          // spread previous page images and current images of page
          setGallery([...gallery, ...r.hits]);
          setLoading(false);
          setButtonStatus(false);
        });
    }
  }, [searchInputValue, page, gallery]);

  const onSearchImages = data => {
    if (searchInputValue === data) {
      toast.warning('You`ve just been searching images by this request ');
      return;
    }
    // set values for search form, reset it to starting values
    setInputValue(data);
    setPage(1);
    setGallery([]);
    // check if our new search value equals to old search value,
    // return if it`s happened
  };
  const onLoadMore = () => {
    // increment page on every pressing that button
    // also set loading hook to 'true'
    setPage(prev => prev + 1);
    setLoading(true);
  };
  const setImageForModal = (modalImage = '', imageAlt = '') => {
    setModalImage(modalImage);
    setModalAltText(imageAlt);
    setShowModal(prev => !prev);
  };

  return (
    <div>
      {isLoading && <Loader></Loader>}
      {showModal && (
        <Modal onClose={setImageForModal}>
          <img src={modalImage} width="600" height="400" alt={modaltAltText} />
        </Modal>
      )}
      <SearchBar onSubmitForm={onSearchImages}></SearchBar>
      <ImageGallery
        openModal={setImageForModal}
        gallery={gallery}
      ></ImageGallery>
      {!isResponseFull && gallery.length >= 12 && (
        <LoadMoreButton
          isDisabled={isDisabledBtn}
          onLoadMore={onLoadMore}
        ></LoadMoreButton>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};
