import React, { useState, useEffect, useRef, useCallback } from 'react';
import api from '../services/api.js';
import { Link, useLocation } from 'react-router-dom';
import { Form, Button, Card, Dropdown } from 'react-bootstrap';
import './RestaurantList.css';
import BackToTopButton from '../BackToTop/BackToTop.js';

function RestaurantList() {
    // State variables to store restaurants, loading status, error message, search query, filters, and pagination data
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [openNow, setOpenNow] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [fetchedPages, setFetchedPages] = useState([]);
    const initialLoad = useRef(true);
    const loadingRef = useRef(false);
    const [sortOption, setSortOption] = useState('best_match');
    const [triggerSearch, setTriggerSearch] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);



    // Function to fetch restaurants based on filters and pagination
    const fetchRestaurants = useCallback((page, searchTerm, selectedCuisine, selectedPriceRange, isOpenNow, selectedSortOption) => {
        if (!hasMore || loadingRef.current) return;
    
        setLoading(true);
        loadingRef.current = true;
    
        api.get(`/restaurants`, { 
            params: {
                term: searchTerm,
                categories: selectedCuisine,
                price: selectedPriceRange,
                open_now: isOpenNow,
                sort_by: selectedSortOption,
                limit: 50, // Increase the limit to 50
                offset: (page - 1) * 50 // Update the offset to match the new limit
            }
        })
        .then(response => {
            if (response.data.businesses.length < 50) { // Update the check to match the new limit
                setHasMore(false);
            }
            setRestaurants(prevRestaurants => [...prevRestaurants, ...response.data.businesses]);
            setLoading(false);
            loadingRef.current = false;
            setIsFirstLoad(false);
            setLoadingMore(false); // Set loadingMore to false after the restaurants have been fetched
        })
        
        .catch(error => {
            console.error("Error fetching restaurants:", error.response);
            setError("Failed to fetch restaurants. Please try again later.");
            setLoading(false);
            loadingRef.current = false;
        });
    }, [hasMore, loadingRef]);
    
    

    

    // Handle search form submission
    const handleSearch = (e) => {
        e.preventDefault();
        setRestaurants([]); // Clear the existing list of restaurants
        setPage(1);
        setHasMore(true);
        setFetchedPages([]);
        setIsFirstLoad(true); // Set isFirstLoad to true before triggering the search
        setTriggerSearch(true);
        if (cuisineFromQuery) {
            setCuisine(''); // Clear the cuisine state variable if it was set from the URL query parameter
        }
    };
    
    

    // Update sort state when sort option changes
    const handleSortChange = (selectedSortOption) => {
        setSortOption(selectedSortOption);
    };

    // Handle infinite scrolling
    const threshold = 200;
    const handleScroll = useCallback(() => {
        if (initialLoad.current) return;
    
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - threshold && !loadingRef.current && hasMore) {
            setPage(prevPage => prevPage + 1);
            setIsFirstLoad(false); // Set isFirstLoad to false when the user scrolls to the end of the page
            setLoadingMore(true); // Set loadingMore to true when the user scrolls to the end of the page
        }
    }, [hasMore]);
    
    

    // Get cuisine from URL query parameter
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const cuisineFromQuery = searchParams.get('cuisine');
    
    useEffect(() => {
        if (cuisineFromQuery) {
            setCuisine(cuisineFromQuery);
        }
    }, [cuisineFromQuery]);

    // Initial fetch of restaurants
    useEffect(() => {
        if (isFirstLoad) {
            if (cuisineFromQuery) {
                setCuisine(cuisineFromQuery);
            }
            fetchRestaurants(1, searchQuery, cuisineFromQuery || cuisine, priceRange, openNow, sortOption);
            initialLoad.current = false;
            setIsFirstLoad(false);
        }
    }, [cuisineFromQuery, searchQuery, priceRange, openNow, sortOption, fetchRestaurants, isFirstLoad, cuisine]);
    
    
    

    // Add and remove scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasMore, searchQuery, cuisine, priceRange, openNow, handleScroll]);
    
    // Fetch more restaurants when page changes
    useEffect(() => {
        if (!isFirstLoad && !fetchedPages.includes(page)) {
            fetchRestaurants(page, searchQuery, cuisine, priceRange, openNow, sortOption);
        }
    }, [page, fetchedPages, searchQuery, cuisine, priceRange, openNow, sortOption, fetchRestaurants, isFirstLoad]);
    

    // Fetch restaurants when search is triggered
    useEffect(() => {
        if (triggerSearch) {
            fetchRestaurants(1, searchQuery, cuisine, priceRange, openNow, sortOption);
            setTriggerSearch(false);
        }
    }, [triggerSearch, searchQuery, cuisine, priceRange, openNow, sortOption, fetchRestaurants]);
    
    

    return (
        <div className="restaurant-list">
            <h2>List of Restaurants</h2>
            
            <div className="advanced-search">
                <Form inline="true" onSubmit={handleSearch}>
                    <Form.Control 
                        type="text" 
                        placeholder="Search for restaurants..." 
                        value={searchQuery} 
                        onChange={e => setSearchQuery(e.target.value)} 
                    />
                    <Form.Control as="select" value={cuisine} onChange={e => setCuisine(e.target.value)}>
                        <option value="">All Cuisines</option>
                        <option value="italian">Italian</option>
                        <option value="chinese">Chinese</option>
                        <option value="mexican">Mexican</option>
                        <option value="japanese">Japanese</option>
                        <option value="french">French</option>
                        <option value="thai">Thai</option>
                        <option value="vietnamese">Vietnamese</option>
                        <option value="mediterranean">Mediterranean</option>
                        <option value="greek">Greek</option>
                        <option value="spanish">Spanish</option>
                        <option value="korean">Korean</option>
                    </Form.Control>
                    <Form.Control as="select" value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                        <option value="">All Price Ranges</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                    </Form.Control>
                    <Form.Check 
                        type="checkbox" 
                        label="Open Now"
                        checked={openNow} 
                        onChange={e => setOpenNow(e.target.checked)} 
                    />
                    <Dropdown onSelect={handleSortChange}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Sort By: {sortOption.replace('_', ' ')}
                        </Dropdown.Toggle>
    
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="best_match">Best Match</Dropdown.Item>
                            <Dropdown.Item eventKey="rating">Rating</Dropdown.Item>
                            <Dropdown.Item eventKey="review_count">Review Count</Dropdown.Item>
                            <Dropdown.Item eventKey="distance">Distance</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button type="submit">Search</Button>
                </Form>
            </div>
            
            {loading && <p>{isFirstLoad ? "Loading..." : (loadingMore ? "Loading more restaurants..." : "")}</p>}
            {error && <p>{error}</p>}
            {!loading && !error && restaurants.length === 0 && <p>No restaurants found.</p>}
            
            <div className="row">
                {restaurants.map((restaurant, index) => (
                    <div className="col-md-4 mb-4" key={`${restaurant.id}-${index}`}>
                    <Card className="restaurant-card">
                        <div className="restaurant-card-img-wrapper">
                        <Card.Img variant="top" src={restaurant.image_url} alt={restaurant.name} />
                        </div>
                        <Card.Body className="restaurant-card-body">
                        <div>
                            <Card.Title>{restaurant.name}</Card.Title>
                            <Card.Text>{restaurant.location.address1}</Card.Text>
                            <Card.Text>{restaurant.phone}</Card.Text>
                            <Card.Text>
                            {restaurant.categories.map(cat => cat.title).join(', ')}
                            </Card.Text>
                            <div className="restaurant-card-price">
                            <Card.Text>{restaurant.price}</Card.Text>
                            </div>
                            <Card.Text>
                            Rating: {restaurant.rating} ({restaurant.review_count} reviews)
                            </Card.Text>
                        </div>
                        <Link to={`/restaurant/${restaurant.id}`} className="btn btn-primary mt-2">View Details</Link>
                        </Card.Body>
                    </Card>
                    </div>
                ))}
            </div>
            <BackToTopButton />
        </div>
    );
    
}

export default RestaurantList;