import React, { useState, useEffect } from 'react';
import api from '../services/api.js';
import { useParams } from 'react-router-dom';
import { Container, Image, Row, Col, ListGroup, Modal} from 'react-bootstrap';
import './RestaurantDetails.css';
import Recommendations from '../Recommendations/Recommendations';
import MapComponent from '../MapComponent/MapComponent';

function RestaurantDetails() {
    // State variables to store restaurant details, loading status, error message, modal visibility, and current image
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    // Get the restaurant ID from the URL parameters
    const { id } = useParams();

    // Helper functions to format day and time
    const formatDay = (day) => {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return days[day];
    };

    const formatTime = (time) => {
        return `${time.slice(0, 2)}:${time.slice(2)}`;
    };

    // Get the operating hours for a specific day
    const getHoursForDay = (day) => {
        const times = restaurant.hours[0].open.filter(time => time.day === day);
        if (times.length === 0) {
            return 'Closed';
        }
        return times.map(time => `${formatTime(time.start)} - ${formatTime(time.end)}`).join(', ');
    };

    // Handle image click to show the modal with the enlarged image
    const handleImageClick = (imageUrl) => {
        setCurrentImage(imageUrl);
        setShowModal(true);
    };

    // Fetch restaurant details when the component mounts
    useEffect(() => {
        api.get(`/restaurants/${id}`)
            .then(response => {
                setRestaurant(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching restaurant details:", error.response);
                setError("Failed to fetch restaurant details. Please try again later.");
                setLoading(false);
            });
    }, [id]);

    // Display loading or error messages
    if (loading) return <Container className="mt-5"><p>Loading...</p></Container>;
    if (error) return <Container className="mt-5"><p>{error}</p></Container>;

    return (
        <Container className="mt-5 restaurant-details-container">
            <Row className="mb-4">
                <Col md={6}>
                    <div className="restaurant-image-container">
                        <Image src={restaurant.image_url} alt={restaurant.name} fluid />
                    </div>
                </Col>
                <Col md={6}>
                    <h2>{restaurant.name}</h2>
                    <p>{restaurant.location.address1}</p>
                    <p>{restaurant.phone}</p>
                    <p><strong>Type:</strong> {restaurant.categories.map(cat => cat.title).join(', ')}</p>
                    <p><strong>Price Range:</strong> {restaurant.price}</p>
                    <p><strong>Rating:</strong> {restaurant.rating} ({restaurant.review_count} reviews)</p>
                    <a href={restaurant.url} target="_blank" rel="noopener noreferrer">View on Yelp</a>
                </Col>
            </Row>

            {/* Display operating hours */}
            {restaurant.hours && restaurant.hours[0] && (
                <div className="mt-5">
                    <h4>Operating Hours:</h4>
                    <ListGroup>
                        {Array.from({ length: 7 }).map((_, index) => (
                            <ListGroup.Item key={index}>
                                {formatDay(index)}: {getHoursForDay(index)}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            )}

            {/* Display photo gallery */}
            {restaurant.photos && (
                <div className="mt-5">
                    <h4>Gallery:</h4>
                    <Row>
                        {restaurant.photos.map((photo, index) => (
                            <Col key={index} md={4} className="mb-4" onClick={() => handleImageClick(photo)} role="button" tabIndex={0}>
                                <img
                                    className="d-block w-100"
                                    src={photo}
                                    alt={`Gallery ${index}`}
                                />
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Body>
                    <img src={currentImage} alt="Enlarged" style={{ width: '100%', height: 'auto' }} />
                </Modal.Body>
            </Modal>

            {/* Display the map with the restaurant's location */}
            {restaurant && restaurant.coordinates && (
                <div className="mt-5">
                    <h4>Location:</h4>
                    <MapComponent 
                        lat={restaurant.coordinates.latitude} 
                        lng={restaurant.coordinates.longitude} 
                    />
                </div>
            )}

            <Recommendations restaurantId={id} />
        </Container>
    );
}

export default RestaurantDetails;
