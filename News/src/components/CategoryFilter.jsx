import React from 'react';

const categories = ['Business', 'Technology', 'Entertainment', 'Health', 'Science', 'Sports'];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex justify-center mb-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`mx-1 px-4 py-2 ${category === selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
