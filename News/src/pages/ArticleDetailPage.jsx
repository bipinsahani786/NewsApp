import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../redux/articlesSlice';
import FavoriteButton from '../components/FavoriteButton';

const ArticleDetailPage = () => {
  const { url } = useParams();
  const dispatch = useDispatch();
  const article = useSelector((state) => state.articles.articles.find((a) => a.url === decodeURIComponent(url)));
  const favorites = useSelector((state) => state.articles.favorites);
  const isFavorite = favorites.some((fav) => fav.url === decodeURIComponent(url));

  if (!article) {
    return <p>Article not found.</p>;
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(article));
  };

  return (
    <div className="container mx-auto">
      <img src={article.urlToImage} alt={article.title} className="w-full h-96 object-cover" />
      <h1 className="text-3xl font-bold my-4">{article.title}</h1>
      <p>{article.content}</p>
      <FavoriteButton article={article} isFavorite={isFavorite} onToggleFavorite={handleToggleFavorite} />
    </div>
  );
};

export default ArticleDetailPage;
