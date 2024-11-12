import React from 'react';

const FeatureCard = ({ title, description, icon, customClass }) => (
  <div className={`flex flex-col items-center justify-center bg-white text-center shadow-lg rounded-lg p-6 ${customClass}`}>
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-600 mt-2">{description}</p>
  </div>
);

const PuzzleFeatureSection = () => {
  const features = [
    { title: "Feature 1", description: "Description for feature 1", icon: "🌟", customClass: "rounded-tl-3xl rounded-br-lg shadow-md" },
    { title: "Feature 2", description: "Description for feature 2", icon: "🚀", customClass: "rounded-tr-3xl rounded-bl-lg shadow-md" },
    { title: "Feature 3", description: "Description for feature 3", icon: "⚙️", customClass: "rounded-bl-3xl rounded-tr-lg shadow-md" },
    { title: "Feature 4", description: "Description for feature 4", icon: "🔒", customClass: "rounded-br-3xl rounded-tl-lg shadow-md" },
    // Add more features with unique styles as needed
  ];

  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index} 
            title={feature.title} 
            description={feature.description} 
            icon={feature.icon} 
            customClass={feature.customClass} 
          />
        ))}
      </div>
    </section>
  );
};

export default PuzzleFeatureSection;
