import React, { useState } from 'react';

const MediaRowImages = ({ image1, image2, image3,title1, title2  ,title3}) => {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  return (
    <div className="row my-2">
      {image1 && (
        <div className={`col ${isHovered1 ? 'hovered' : ''}`} onMouseEnter={() => setIsHovered1(true)} onMouseLeave={() => setIsHovered1(false)}>
          <img className="animate__animated animate__zoomIn image" src={image1} alt={`Image ${title1} 1`} />
          <h5>{title1}</h5>
        </div>
      )}
      {image2 && (
        <div className={`col ${isHovered2 ? 'hovered' : ''}`} onMouseEnter={() => setIsHovered2(true)} onMouseLeave={() => setIsHovered2(false)}>
          <img className="animate__animated animate__zoomIn image" src={image2} alt={`Image ${title2} 2`} />
          <h5>{title2}</h5>
        </div>
      )}


    {image3 && (
        <div className={`col ${isHovered3 ? 'hovered' : ''}`} onMouseEnter={() => setIsHovered3(true)} onMouseLeave={() => setIsHovered3(false)}>
          <img className="animate__animated animate__zoomIn image" src={image3} alt={`Image ${title3} 3`} />
          <h5>{title3}</h5>
        </div>
      )}
    </div>
  );
};

export default MediaRowImages;
