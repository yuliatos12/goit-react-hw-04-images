import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types'

export const ImageGallery = ({photos, handleImageItemClick}) => (
    <ul>
        {photos.map(({id, webformatURL, tags }) => (
            <ImageGalleryItem
                id={id}
                tags={tags}
                smallUrl={webformatURL}
                handleImageItemClick={handleImageItemClick} />
        ))}
    </ul>
);

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  handleImageItemClick: PropTypes.func.isRequired,
};