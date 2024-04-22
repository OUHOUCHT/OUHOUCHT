import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function CarouselFadeExample({ items }) {
  return (
      <Carousel fade>
        {items.map((item, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-50"
              src={item.baseUrl}
              alt={`Slide ${index + 1}`}
              height={400}
            />
            <Carousel.Caption>
              <h5 style={{color:"darkgray"}} className='p-3'>{item.filename}</h5>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
  );
}

export default CarouselFadeExample;
