import React, { useState, useEffect } from 'react';
import './BackToTop.css';

const BackToTop = () => {
  // State variable to track whether the "Back to Top" button should be visible
  const [isVisible, setIsVisible] = useState(false);

  // Function to smoothly scroll the user back to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Function to handle the scroll event and toggle the visibility of the "Back to Top" button
  const handleScroll = () => {
    // Check the vertical scroll position of the window
    if (window.scrollY > 200) { // Show the button if the user has scrolled down 200 pixels or more
      setIsVisible(true);
    } else { // Hide the button if the user is within the top 200 pixels of the page
      setIsVisible(false);
    }
  };

  // useEffect hook to add and remove the scroll event listener
  useEffect(() => {
    // Add the scroll event listener when the component is mounted
    window.addEventListener('scroll', handleScroll);

    // Remove the scroll event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount and unmount

  // Render the "Back to Top" button if it should be visible
  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="back-to-top-button" // Class for styling the button
      >
        Back to Top
      </button>
    )
  );
};

export default BackToTop;
