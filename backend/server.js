const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5001;
require('dotenv').config();

const API_KEY = process.env.YELP_API_KEY;
// CORS configuration
const corsOptions = {
<<<<<<< HEAD
    origin: ['http://localhost:3000', 'https://restaurant-finding.netlify.app'],
=======
    origin: ['http://localhost:3000', 'https://spontaneous-caramel-d2552b.netlify.app'],
>>>>>>> heroku/main
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Route for fetching restaurants based on query parameters
app.get('/api/restaurants', async (req, res) => {
    // Extract query parameters
<<<<<<< HEAD
    let {open_now, price, sort_by, latitude, longitude, rating } = req.query;
=======
    let { term, categories, open_now, price, sort_by, latitude, longitude, rating } = req.query;
>>>>>>> heroku/main

    // Handle the open_now parameter
    if (open_now === 'true') {
        req.query.open_now = true;
    } else {
        delete req.query.open_now;
    }

    // Handle the price parameter
    if (!price || price.length === 0) {
        delete req.query.price;
    } else {
        price = price.split(',').filter(p => ['1', '2', '3', '4'].includes(p)).join(',');
        if (price.length === 0) {
            delete req.query.price;
        } else {
            req.query.price = price;
        }
    }

    // Set the default limit and sort_by
    req.query.limit = '50'; // Fetch up to 50 restaurants
    if (!sort_by) {
        req.query.sort_by = 'best_match'; // Default sorting
    }

    const location = latitude && longitude ? `${latitude},${longitude}` : 'VANCOUVER';

    try {
        const response = await axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            },
            params: req.query
        });

        let restaurants = response.data.businesses;

        // Handle the rating parameter
        if (rating) {
            restaurants = restaurants.filter(restaurant => restaurant.rating >= parseFloat(rating));
        }

        res.json({ businesses: restaurants });
    } catch (error) {
        console.error("Error fetching restaurants from Yelp:", error.response ? error.response.data : error);
        if (error.response && error.response.data && error.response.data.error) {
            res.status(500).json({ error: error.response.data.error.description });
        } else {
            res.status(500).json({ error: 'Failed to fetch restaurants' });
        }
    }
});

// Route for fetching popular restaurants
app.get('/api/restaurants/popular', async (req, res) => {
    try {
        const response = await axios.get(`https://api.yelp.com/v3/businesses/search?term=restaurants&location=VANCOUVER&sort_by=review_count&limit=25`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        if (!response.data.businesses || response.data.businesses.length === 0) {
            return res.status(404).json({ error: 'No popular restaurants found.' });
        }

        // Filter out restaurants with a rating above 4.0 and more than 250 reviews
        const popularRestaurants = response.data.businesses.filter(restaurant => 
            restaurant.rating > 4.0 && restaurant.review_count > 250
        );

        // Shuffle the array to introduce randomness
        popularRestaurants.sort(() => 0.5 - Math.random());

        // Return the top 3 popular restaurants
        res.json(popularRestaurants.slice(0, 3));
    } catch (error) {
        console.error("Error fetching popular restaurants:", error.response ? error.response.data : error.message);
        if (error.response && error.response.data && error.response.data.error) {
            res.status(500).json({ error: error.response.data.error.description });
        } else {
            res.status(500).json({ error: 'Failed to fetch popular restaurants', details: error.message });
        }
    }
});

// Route for fetching a specific restaurant by ID
app.get('/api/restaurants/:id', async (req, res) => {
    const restaurantId = req.params.id;
    try {
        const response = await axios.get(`https://api.yelp.com/v3/businesses/${restaurantId}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching restaurant details from Yelp:", error.response ? error.response.data.error : error.message);
        res.status(500).json({ error: 'Failed to fetch restaurant details' });
    }
});

// Route for fetching recommendations for a specific restaurant
app.get('/api/restaurants/:id/recommendations', async (req, res) => {
    const restaurantId = req.params.id;
    
    if (restaurantId === "popular") {
        return res.status(400).json({ error: 'Invalid restaurant ID' });
    }
    try {
        // Fetch the details of the current restaurant
        const response = await axios.get(`https://api.yelp.com/v3/businesses/${restaurantId}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        const categories = response.data.categories.map(cat => cat.alias).join(',');

        // Fetch similar restaurants based on the category
        const recommendations = await axios.get(`https://api.yelp.com/v3/businesses/search?location=VANCOUVER&categories=${categories}&limit=8`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        if (!recommendations.data.businesses || recommendations.data.businesses.length === 0) {
            return res.status(404).json({ error: 'No recommendations found for this restaurant.' });
        }

        // Filter out the current restaurant and take only the first 6 recommendations
        const filteredRecommendations = recommendations.data.businesses.filter(restaurant => restaurant.id !== restaurantId).slice(0, 6);

        res.json(filteredRecommendations);
    } catch (error) {
        console.error("Error fetching restaurant recommendations:", error.response ? error.response.data.error : error.message);
        res.status(500).json({ error: 'Failed to fetch restaurant recommendations' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
