import React, { useState } from 'react';
import { FaSadTear, FaFrown, FaMeh, FaSmile, FaLaugh } from 'react-icons/fa';
import './OpinionComponent.css'; // استيراد ملف الـ CSS الخاص بالتنسيق
import { IoIosInformation } from "react-icons/io";

const OpinionComponent = ({renderTooltip,handleRatingChange,rating}) => {
 

  
  return (
    <div className="" >
      <div className='rating-content '>
      <p className='rating-response' lang='ar'>ما هو تقييمك الشخصي لجناح البرلمان في المعرض الدولي للنشر والكتاب؟</p>
      {/**       <p className='rating-response' lang='ar'>ماهو تقييمك : {rating}/5  </p> */}
      <div className="rating-icons">
      <span onClick={() => handleRatingChange(5)} title={renderTooltip(5)}>
          <FaLaugh className={rating === 5 ? "icon active" : "icon"} />
        </span>
        <span onClick={() => handleRatingChange(4)} title={renderTooltip(4)}>
          <FaSmile className={rating === 4 ? "icon active" : "icon"} />
        </span>

        <span onClick={() => handleRatingChange(3)} title={renderTooltip(3)}>
          <FaMeh className={rating === 3 ? "icon active" : "icon"} />
        </span>

        <span onClick={() => handleRatingChange(2)} title={renderTooltip(2)}>
          <FaFrown className={rating === 2 ? "icon active" : "icon"} />
        </span>

        <span onClick={() => handleRatingChange(1)} title={renderTooltip(1)}>
          <FaSadTear className={rating === 1 ? "icon active" : "icon"} />
        </span>

      </div>
        <p className='mt-2' > <span >{renderTooltip(rating)}</span></p>
      </div>

    </div>
  );
};

export default OpinionComponent;
