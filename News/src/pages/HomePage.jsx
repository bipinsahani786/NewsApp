import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles, searchArticles } from '../redux/articlesSlice';
import ArticleList from '../components/ArticleList';
import Pagination from '../components/Pagination';
import CategoryFilter from '../components/CategoryFilter';
import SearchInput from '../components/SearchInput';

const HomePage = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const status = useSelector((state) => state.articles.status);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('Business');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchArticles(searchQuery));
    } else {
      dispatch(getArticles({ category: selectedCategory, page: currentPage }));
    }
  }, [dispatch, selectedCategory, currentPage, searchQuery]);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto">
      <SearchInput onSearch={handleSearch} />
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && <ArticleList articles={articles} />}
      {status === 'failed' && <p>Error loading articles.</p>}
      <Pagination currentPage={currentPage} totalPages={5} onPageChange={handlePageChange} />
    </div>
  );
};

export default HomePage;
