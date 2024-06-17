import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/articlesSlice';
import FavoriteButton from './FavoriteButton';

const ArticleItem = ({ article }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.articles.favorites);
  const isFavorite = favorites.some((fav) => fav.url === article.url);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(article));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{article.title}</h2>
        <p>{article.description}</p>
        <Link to={`/article/${encodeURIComponent(article.url)}`} className="text-blue-500">
          Read more
        </Link>
        <FavoriteButton article={article} isFavorite={isFavorite} onToggleFavorite={handleToggleFavorite} />
      </div>
    </div>
  );
};

export default ArticleItem;
