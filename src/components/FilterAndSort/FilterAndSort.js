import React, { useState } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import './FilterAndSort.css';

const FilterAndSort = ({ onFilterChange, onSortChange }) => {
  // State variables to track the selected filter and sort options
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [selectedSort, setSelectedSort] = useState('best_match');

  // Function to handle changes in the filter options and pass them to the parent component
  const handleFilterChange = () => {
    onFilterChange({
      categories: selectedCuisine,
      price: selectedPrice,
      rating: selectedRating,
      open_now: isOpenNow,
    });
  };

  // Function to handle changes in the sort option and pass it to the parent component
  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
    onSortChange(event.target.value);
  };

  return (
    <div className="filter-sort-container">
      <div className="filter-options">
        {/* Dropdown for selecting cuisine */}
        <Form.Control as="select" value={selectedCuisine} onChange={(e) => setSelectedCuisine(e.target.value)}>
          <option value="">All Cuisines</option>
          <option value="italian">Italian</option>
          <option value="chinese">Chinese</option>
          <option value="mexican">Mexican</option>
          <option value="japanese">Japanese</option>
          <option value="french">French</option>
          <option value="thai">Thai</option>
          <option value="vietnamese">Vietnamese</option>å
          <option value="mediterranean">Mediterranean</option>
          <option value="greek">Greek</option>
          <option value="spanish">Spanish</option>
          <option value="korean">Korean</option>
        </Form.Control>
        {/* Dropdown for selecting price */}
        <Form.Control as="select" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
          <option value="">All Prices</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
        </Form.Control>
        {/* Dropdown for selecting rating */}
        <Form.Control as="select" value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)}>
          <option value="">All Ratings</option>
          <option value="3">3+ stars</option>
          <option value="3.5">3.5+ stars</option>
          <option value="4">4+ stars</option>
          <option value="4.5">4.5+ stars</option>
          <option value="5">5 stars</option>
        </Form.Control>
        {/* Checkbox for filtering by restaurants that are currently open */}
        <Form.Check 
          type="checkbox" 
          label="Open Now"
          checked={isOpenNow} 
          onChange={(e) => setIsOpenNow(e.target.checked)} 
          className="open-now-checkbox"
        />
        {/* Button to apply the selected filters */}
        <div className="filter-button-container">
          <button className="apply-filters" onClick={handleFilterChange}>Apply Filters</button>
        </div>
      </div>
      <div className="sort-options">
        {/* Dropdown for selecting the sort option */}
        <Form.Control as="select" value={selectedSort} onChange={handleSortChange}>
          <option value="best_match">Best Match</option>
          <option value="rating">Highest Rated</option>
          <option value="review_count">Most Reviewed</option>
          <option value="distance">Distance</option>
        </Form.Control>
      </div>
    </div>
  );
};

export default FilterAndSort;
