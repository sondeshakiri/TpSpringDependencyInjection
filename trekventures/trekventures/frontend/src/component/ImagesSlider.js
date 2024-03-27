import React, { useState } from 'react';

export default function ImageSlider  ({ images }) 
 {
   return (
    <div className="image-slider">
      <div className="image-container">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index}`} />
        ))}
      </div>
    </div>
  );
};


