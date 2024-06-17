import React from 'react';

const FavoriteButton = ({ article, isFavorite, onToggleFavorite }) => {
  return (
    <button
      onClick={() => onToggleFavorite(article)}
      className={`px-4 py-2 ${isFavorite ? 'bg-red-500' : 'bg-gray-500'} text-white rounded`}
    >
      {isFavorite ? 'Unfavorite' : 'Favorite'}
    </button>
  );
};

export default FavoriteButton;
