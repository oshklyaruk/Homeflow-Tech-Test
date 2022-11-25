import React from 'react';
import PropTypes from 'prop-types';
import { FaBookmark } from 'react-icons/fa';

function PropertyCard({ property, handleBookmarkClick, isSaved }) {
  const { photos, display_address: displayAddress, price } = property;

  return (
    <div className="border-2 bg-gray-50">
      <div className="relative">
        {
          photos.length
            ? <img src={`https://mr0.homeflow.co.uk/${photos[0]}`} alt={displayAddress} />
            : <img src="/no-image.png" alt="unavailable" />
        }

        <button className="absolute top-0 right-2" type="button" title="Click to bookmark this property" onClick={() => handleBookmarkClick(property)}>
          <FaBookmark className={isSaved ? 'text-red-400' : 'text-yellow-400'} size="40" />
        </button>

        <p className="absolute bottom-0 right-0 px-2 py-1 border-t border-l bg-gray-50">{price}</p>
      </div>

      <div className="px-3 py-2">
        <p>{displayAddress}</p>
      </div>
    </div>
  );
}

PropertyCard.propTypes = {
  property: PropTypes.shape({
    price: PropTypes.string.isRequired,
    display_address: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  isSaved: PropTypes.bool.isRequired,
  handleBookmarkClick: PropTypes.func.isRequired
}

export default PropertyCard;
