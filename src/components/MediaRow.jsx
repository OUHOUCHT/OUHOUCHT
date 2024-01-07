import React from 'react';

const MediaRow = ({ title, image1, image2, icon }) => (
   <>
  <div className="row my-2">
    <div className="col">
      <h3 style={{ fontFamily: 'Reem Kufi' }} className="mt-2" >
        {title} <img className="icon-butt_modal" src={icon} alt="" />
      </h3>
    </div>
  </div>

  <div className="row my-2">
      <div className="col">
      <img style={{ width: '8rem' }} src={image1} alt={`Image ${title} 1`} />
    </div>
    <div className="col">
      <img style={{ width: '8rem' }} src={image2} alt={`Image ${title} 2`} />
    </div>
    </div>
    </>

);

export default MediaRow;
