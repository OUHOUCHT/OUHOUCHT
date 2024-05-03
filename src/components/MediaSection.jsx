import React from 'react';
import left_arrow  from '/left-arrow-svgrepo-com.svg';

const MediaSection = ({ handleShowModal }) => (
  <td rowSpan={3} className="centered-cell">
    <div style={{ height: '90%' }} className='animate__animated animate__fadeIn'>
      <div>
        <img style={{ width: '18rem' }} className="enlarge-on-hover"  src="/qr-app.png" alt="" />
        <h3 className='title' >البرنامج </h3>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <a href='' onClick={handleShowModal}>
          <div className="button-border-2 button-border-medias animate__animated animate__zoomIn mt-2">
            <h3><img className="icon-butt" src={left_arrow} alt="" /> وسائل التواصل الإجتماعي</h3>
          </div>
        </a>
      </div>
    </div>
  </td>
);

export default MediaSection;
