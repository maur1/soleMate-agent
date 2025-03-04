// pages/shoes.tsx

import React from 'react';

const recommendedShoes = {
  recommended_running_shoes: [
    {
      model: 'Saucony Endorphin Speed 3',
      description: 'Great for long-distance runs, lightweight, and responsive.',
      purchase_link:
        'https://www.google.com/search?q=Saucony+Endorphin+Speed+3&tbm=shop',
    },
    {
      model: 'Nike ZoomX Vaporfly NEXT% 2',
      description:
        'Designed for speed and efficiency; ideal for those looking to improve their race times.',
      purchase_link:
        'https://www.google.com/search?q=Nike+ZoomX+Vaporfly+NEXT%25+2&tbm=shop',
    },
    {
      model: 'Hoka One One Clifton 8',
      description:
        'Known for its cushioning and comfort, perfect for daily training.',
      purchase_link:
        'https://www.google.com/search?q=Hoka+One+One+Clifton+8&tbm=shop',
    },
    {
      model: 'Adidas Adizero Adios Pro 2',
      description:
        'A favorite among competitive runners for its lightweight and fast feel.',
      purchase_link:
        'https://www.google.com/search?q=Adidas+Adizero+Adios+Pro+2&tbm=shop',
    },
  ],
};

export default function ShoesPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Recommended Running Shoes</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {recommendedShoes.recommended_running_shoes.map((shoe, index) => (
          <li
            key={index}
            style={{
              marginBottom: '1.5rem',
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '8px',
            }}
          >
            <h2 style={{ margin: '0 0 0.5rem 0' }}>{shoe.model}</h2>
            <p style={{ margin: '0 0 1rem 0' }}>{shoe.description}</p>
            <a
              href={shoe.purchase_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0070f3', textDecoration: 'none' }}
            >
              Purchase
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
