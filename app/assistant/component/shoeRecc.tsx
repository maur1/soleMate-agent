// components/ShoeRecommendation.tsx
import Image from 'next/image';
import React from 'react';

interface ShoeRecommendationProps {
  recommendation: {
    shoe_name: string;
    recommendation_reason: string;
    image_url: string;
    purchase_url: string;
  };
}

const ShoeRecommendation: React.FC<ShoeRecommendationProps> = ({ recommendation }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Image Section */}
      <div className="relative h-64 w-full">
        <Image
          src={recommendation.image_url}
          alt={recommendation.shoe_name}
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          {recommendation.shoe_name}
        </h2>
        <p className="text-gray-700 mb-4">
          {recommendation.recommendation_reason}
        </p>
        <a
          href={recommendation.purchase_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Buy Now
        </a>
      </div>
    </div>
  );
};

export default ShoeRecommendation;
