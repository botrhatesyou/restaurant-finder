import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import RestaurantList from './components/RestaurantList/RestaurantList';
import RestaurantDetails from './components/RestaurantDetails/RestaurantDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapPage from './components/MapPage/MapPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="content-wrapper">
                    {/* Define the routes for the application */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/restaurants" element={<RestaurantList />} />
                        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                        <Route path="/map" element={<MapPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
