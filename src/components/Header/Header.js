import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css'

function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <div className="brand-container">
                <Navbar.Brand>Restaurant Finder</Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {/* Define the navigation links */}
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/restaurants">Explore Restaurants</Nav.Link>
                    <Nav.Link as={Link} to="/map">Local Restaurant Finder</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
