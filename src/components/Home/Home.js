import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api.js';
import './Home.css'
import HeroSection from '../HeroSection/HeroSection';
import italianCuisine from './cuisinespngs/it.png';
import chineseCuisine from './cuisinespngs/cn.png';
import mexicanCuisine from './cuisinespngs/mx.png';
import vietnameseCuisine from './cuisinespngs/vn.png'; 
import japaneseCuisine from './cuisinespngs/jp.png';
import thaiCuisine from './cuisinespngs/th.png';
import greekCuisine from './cuisinespngs/gr.png';
import frenchCuisine from './cuisinespngs/fr.png';

function Home() {
    const navigate = useNavigate();

    const handleViewRestaurants = (cuisine) => {
        navigate(`/restaurants?cuisine=${cuisine}`);
    };

    const [popularRestaurants, setPopularRestaurants] = useState([]);

    const fetchPopularRestaurants = async () => {
        try {
            const response = await api.get('/restaurants/popular');
            setPopularRestaurants(response.data);
        } catch (error) {
            console.error("Error fetching popular restaurants:", error);
        }
    }

    useEffect(() => {
        fetchPopularRestaurants();
    }, []);

    return (
        <div className="home-container">
            <HeroSection />

            {/* Features or Services Section */}
            <Container className="mt-5">
                <h2>Features</h2>
                <Row>
                    <Col md={4}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Advanced Search</Card.Title>
                                <Card.Text>Find restaurants based on cuisine, price range, and more.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Restaurant Details</Card.Title>
                                <Card.Text>View detailed information, ratings, and reviews of restaurants.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Recommendations</Card.Title>
                                <Card.Text>Get restaurant recommendations based on your preferences.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Popular Restaurants */}
            <Container className="mt-5">
                <h2>Popular Restaurants</h2>
                <div className="popular-restaurants">
                    <Row>
                        {popularRestaurants.map((restaurant, index) => (
                            <Col md={4} key={index}>
                                <Card className="mb-4">
                                    <Card.Img variant="top" src={restaurant.image_url} alt={restaurant.name} />
                                    <Card.Body>
                                        <Card.Title>{restaurant.name}</Card.Title>
                                        <Card.Text>{restaurant.description}</Card.Text>
                                        <Link to={`/restaurant/${restaurant.id}`} className="btn btn-primary">View Details</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>

            <Container className="mt-5">
                <h2>Explore Cuisines</h2>
                <Row>
                    {/* Italian Cuisine */}
                    <Col md={3}>
                        <Card className="mb-4">
                            <Card.Img variant="top" src={italianCuisine} alt="Italian Cuisine" className="cuisine-image" />
                            <Card.Body>
                                <Card.Title>Italian</Card.Title>
                                <Button variant="primary" onClick={() => handleViewRestaurants('italian')}>View Restaurants</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* Chinese Cuisine */}
                    <Col md={3}>
                        <Card className="mb-4">
                            <Card.Img variant="top" src={chineseCuisine} alt="Chinese Cuisine" className="cuisine-image" />
                            <Card.Body>
                                <Card.Title>Chinese</Card.Title>
                                <Button variant="primary" onClick={() => handleViewRestaurants('chinese')}>View Restaurants</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* Mexican Cuisine */}
                    <Col md={3}>
                        <Card className="mb-4">
                            <Card.Img variant="top" src={mexicanCuisine} alt="Mexican Cuisine" className="cuisine-image" />
                            <Card.Body>
                                <Card.Title>Mexican</Card.Title>
                                <Button variant="primary" onClick={() => handleViewRestaurants('mexican')}>View Restaurants</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* Vietnamese Cuisine */}
                    <Col md={3}>
                        <Card className="mb-4">
                            <Card.Img variant="top" src={vietnameseCuisine} alt="Vietnamese Cuisine" className="cuisine-image" />
                            <Card.Body>
                                <Card.Title>Vietnamese</Card.Title>
                                <Button variant="primary" onClick={() => handleViewRestaurants('vietnamese')}>View Restaurants</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Japanese Cuisine */}
                    <Col md={3}>
                        <Card className="mb-4">
                            <Card.Img variant="top" src={japaneseCuisine} alt="Japanese Cuisine" className="cuisine-image" />
                            <Card.Body>
                                <Card.Title>Japanese</Card.Title>
                                <Button variant="primary" onClick={() => handleViewRestaurants('japanese')}>View Restaurants</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* Thai Cuisine */}
                    <Col md={3}>
                        <Card className="mb-4">
                            <Card.Img variant="top" src={thaiCuisine} alt="Thai Cuisine" className="cuisine-image" />
                            <Card.Body>
                                <Card.Title>Thai</Card.Title>
                                <Button variant="primary" onClick={() => handleViewRestaurants('thai')}>View Restaurants</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* Greek Cuisine */}
                    <Col md={3}>
                        <Card className="mb-4">
                            <Card.Img variant="top" src={greekCuisine} alt="Greek Cuisine" className="cuisine-image" />
                            <Card.Body>
                                <Card.Title>Greek</Card.Title>
                                <Button variant="primary" onClick={() => handleViewRestaurants('greek')}>View Restaurants</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* French Cuisine */}
                    <Col md={3}>
                        <Card className="mb-4">
                            <Card.Img variant="top" src={frenchCuisine} alt="French Cuisine" className="cuisine-image" />
                            <Card.Body>
                                <Card.Title>French</Card.Title>
                                <Button variant="primary" onClick={() => handleViewRestaurants('french')}>View Restaurants</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* How It Works Section */}
            <Container className="mt-5">
                <h2>How It Works</h2>
                <Row>
                    <Col md={4}>
                        <h4>1. Search</h4>
                        <p>Enter your preferences and find the best restaurants around you.</p>
                    </Col>
                    <Col md={4}>
                        <h4>2. Explore</h4>
                        <p>View restaurant details, ratings, and reviews.</p>
                    </Col>
                    <Col md={4}>
                        <h4>3. Enjoy</h4>
                        <p>Visit the restaurant or order online. Enjoy your meal!</p>
                    </Col>
                </Row>
            </Container>

            {/* Footer */}
            <footer className="mt-5 text-center">
                <p>&copy; 2023 Restaurant Finder. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;