import PropTypes from 'prop-types'
import css from "./ImageGalleryItem.module.css"
export const ImageGalleryItem = ({id, smallUrl, tags, handleImageItemClick }) => (
    <li
        key={id}
        data-id={id}
        onClick={handleImageItemClick}
    >
        <img className={css.small_img} src={smallUrl} alt={tags} data-id={id} />
    </li>
);

ImageGalleryItem.propTypes = {
    id: PropTypes.number.isRequired,
    smallUrl: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    handleImageItemClick: PropTypes.func.isRequired,
};