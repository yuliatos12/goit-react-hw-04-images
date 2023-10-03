import { createPortal } from "react-dom";
import { useEffect } from "react";
import PropTypes from 'prop-types'
import css from "./Modal.module.css"

const modalRoot = document.querySelector('#modal-root');
export const Modal = ({ selectedPhoto: { largeImageURL, tags }, onClose }) => {
    useEffect(() => {
        function onEscapeCloseModal(event) {
            if (event.code === 'Escape') {
                onClose();
            }
        }

        window.addEventListener('keydown', onEscapeCloseModal);
        return () => {
            window.removeEventListener('keydown', onEscapeCloseModal);
        };
    }, [onClose]);

    const onClickOverlay = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div className={css.overlay} onClick={onClickOverlay}>
            <div className={css.modal}>
                <img src={largeImageURL} alt={tags} />
            </div>
        </div>,
        modalRoot
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    selectedPhoto: PropTypes.shape({
        id: PropTypes.number.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }).isRequired,
};