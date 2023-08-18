import React, { useState, useEffect } from 'react';
import api from '../services/api.js';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './Recommendations.css'

function Recommendations({ restaurantId }) {
    // State variable to store the list of recommended restaurants
    const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);

    // useEffect hook to fetch recommended restaurants when the component mounts
    useEffect(() => {
        // Make an API call to get the recommended restaurants for the given restaurantId
        api.get(`/restaurants/${restaurantId}/recommendations`)
            .then(response => {
                // Filter out the current restaurant from the recommendations
                const filteredRecommendations = response.data.filter(restaurant => restaurant.id !== restaurantId);
                // Update the state with the filtered recommendations
                setRecommendedRestaurants(filteredRecommendations);
            })
            .catch(error => {
                // Log any errors that occur during the API call
                console.error("Error fetching recommendations:", error.response);
            });
    }, [restaurantId]);  // Dependency array, re-run the effect if restaurantId changes

    return (
        <div className="recommendations-section">
            <h4>You might also like:</h4>
            <div className="row">
                {recommendedRestaurants.map((restaurant, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        {/* Wrap the Card inside a Link to navigate to the restaurant details page */}
                        <Link 
                            to={`/restaurant/${restaurant.id}`} 
                            className="rec-restaurant-card-link"
                            onClick={() => window.scrollTo(0, 0)}  // Scroll to the top of the page when navigating
                        >
                            <Card className="rec-restaurant-card">
                                <Card.Img variant="top" src={restaurant.image_url} alt={restaurant.name} />
                                <Card.Body>
                                    <Card.Title>{restaurant.name}</Card.Title>
                                    {/* Button to navigate to the restaurant details page */}
                                    <button className="btn btn-primary mt-2">View Details</button>
                                </Card.Body>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recommendations;
