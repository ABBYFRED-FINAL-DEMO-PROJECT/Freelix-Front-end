import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CheckCircle, AccessAlarm, IntegrationInstructions } from '@mui/icons-material';
import flogo from '../assets/flogo.png'; // Import the logo image
// import bg from '../assets/bg2.jpg'; // Import the background image
import dbImage1 from '../assets/db.png'; // Import top left illustration
import dbImage2 from '../assets/db1.png'; // Import additional top left illustration
import dbImage3 from '../assets/db2.png'; // Import additional top left illustration
import dbImage4 from '../assets/db3.png'; // Import additional top left illustration
import tkImage1 from '../assets/tk.png'; // Import bottom right illustration
import tkImage2 from '../assets/tk1.png'; // Import additional bottom right illustration
import tkImage3 from '../assets/tk2.png'; // Import additional bottom right illustration
import tkImage4 from '../assets/tk3.png'; // Import additional bottom right illustration

const dbImages = [dbImage1, dbImage2, dbImage3, dbImage4];
const tkImages = [tkImage1, tkImage2, tkImage3, tkImage4];

const LandingPage = () => {
  const [dbIndex, setDbIndex] = useState(0);
  const [tkIndex, setTkIndex] = useState(0);

  useEffect(() => {
    const dbInterval = setInterval(() => {
      setDbIndex((prevIndex) => (prevIndex + 1) % dbImages.length);
    }, 3000);

    const tkInterval = setInterval(() => {
      setTkIndex((prevIndex) => (prevIndex + 1) % tkImages.length);
    }, 3000);

    return () => {
      clearInterval(dbInterval);
      clearInterval(tkInterval);
    };
  }, []);

  return (
    <div>
      {/* Hero Section with background image */}
      <div
        style={{
          // backgroundImage: `url(${bg})`,
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
          padding: '20px 0',
          width: '100%',
          position: 'relative', // Allow positioning of child elements
        }}
      >
        {/* Top Left Illustration */}
        <img
          src={dbImages[dbIndex]}
          alt="Top Left Illustration"
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '20%', // Responsive width for smaller screens
            minWidth: '150px', // Ensures a minimum size
            maxWidth: '300px', // Limits maximum size
            zIndex: 1, // Ensure it's on top of the background
          }}
        />

        <div className="bg-transparent text-[#00796B] flex flex-col items-center py-16 px-4 sm:px-8 md:px-10 lg:px-20">
          {/* Main Content */}
          <div className="text-center max-w-3xl w-full mt-32"> {/* Adjusted margin-top for spacing */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{ color: '#263238', fontFamily: 'Arial, sans-serif' }}
            >
              Think, plan, & track <span className="block">all in one place</span>
            </h1>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#00796B',
                color: 'white',
                fontWeight: 'bold',
                padding: '10px 20px',
                marginBottom: '20px', // Added margin to create space above the illustration
              }}
              className="shadow hover:bg-gray-200 transition"
              component={Link}
              to="/dashboard"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Bottom Right Illustration */}
        <img
          src={tkImages[tkIndex]}
          alt="Bottom Right Illustration"
          style={{
            position: 'absolute',
            bottom: '0', // Set to the very bottom of the container
            right: '5%',
            transform: 'translateY(50%)', // Pushes the illustration down slightly
            width: '20%', // Responsive width for smaller screens
            minWidth: '150px', // Ensures a minimum size
            maxWidth: '300px', // Limits maximum size
            zIndex: 1, // Ensure it's on top of the background
          }}
        />
      </div>

      {/* Footer */}
      {/* <footer
        style={{
          textAlign: 'center',
          padding: '10px',
          backgroundColor: '#00796B',
          color: '#fff',
        }}
      >
        <p>© 2024 Freelix. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default LandingPage;
