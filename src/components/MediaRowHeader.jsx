import React from 'react';

const MediaRowHeader = ({ title, icon }) => (
  <div className="row my-2">
    <div className="col">
      <h4 className="mt-2" >
        {title} <img className="icon-butt_modal" src={icon} alt="" />
      </h4>
    </div>
  </div>
);

export default MediaRowHeader;
