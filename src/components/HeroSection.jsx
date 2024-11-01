import React from 'react';
import { Button } from '@mui/material';
import { CheckCircle, AccessAlarm, IntegrationInstructions } from '@mui/icons-material';

const HeroSection = () => {
  return (
    <div className="bg-[#00796B] text-white flex flex-col items-center py-16 px-4 md:px-20">
      {/* Main Content */}
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Think, plan, and track <span className="block">all in one place</span>
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Efficiently manage your tasks and boost productivity.
        </p>
        <Button
          variant="contained"
          style={{
            backgroundColor: 'white',
            color: '#00796B',
            fontWeight: 'bold',
            padding: '10px 20px',
          }}
          className="shadow hover:bg-gray-200 transition"
        >
          Get Started
        </Button>
      </div>

      {/* Decorative Elements */}
      <div className="relative mt-10 flex flex-wrap justify-center gap-6">
        {/* Sample Decorative Card 1 */}
        <div className="w-32 h-32 bg-white text-[#00796B] flex flex-col items-center justify-center p-4 rounded-lg shadow">
          <CheckCircle fontSize="large" />
          <p className="mt-2 text-center">Tasks</p>
        </div>

        {/* Sample Decorative Card 2 */}
        <div className="w-32 h-32 bg-white text-[#00796B] flex flex-col items-center justify-center p-4 rounded-lg shadow">
          <AccessAlarm fontSize="large" />
          <p className="mt-2 text-center">Reminders</p>
        </div>

        {/* Sample Decorative Card 3 */}
        <div className="w-32 h-32 bg-white text-[#00796B] flex flex-col items-center justify-center p-4 rounded-lg shadow">
          <IntegrationInstructions fontSize="large" />
          <p className="mt-2 text-center">Integrations</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
