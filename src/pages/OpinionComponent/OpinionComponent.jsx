import React, { useState } from 'react';
import { FaSadTear, FaFrown, FaMeh, FaSmile, FaLaugh } from 'react-icons/fa';
import './OpinionComponent.css'; // استيراد ملف الـ CSS الخاص بالتنسيق
import { IoIosInformation } from "react-icons/io";
import { useTranslation } from 'react-i18next';

const OpinionComponent = ({renderTooltip,handleRatingChange,rating,error}) => {
  const { t ,i18n} = useTranslation(); // Access translation functions

  
  
  return (
      <div className='rating-content '>
      {/**       <p className='rating-response' lang='ar'>ماهو تقييمك : {rating}/5  </p> */}
      <div className={`rating-icons`}>
          <div  onClick={() => handleRatingChange(5)} title={renderTooltip(5)}>
            <FaLaugh className={rating === 5 ? "icon active" : "icon"} />
            <p className={`${rating === 5 && 'active'}`} >{t('feedback.tooltip.excellent')}</p>
          </div>
          <div  onClick={() => handleRatingChange(4)} title={renderTooltip(4)}>
            <FaSmile className={rating === 4 ? "icon active" : "icon"} />
            {rating === 4 && <p className='mb-3 active'>{t('feedback.tooltip.good')}</p> }
          </div>

          <div onClick={() => handleRatingChange(3)} title={renderTooltip(3)}>
            <FaMeh className={rating === 3 ? "icon active" : "icon"} />
            {rating === 3 &&  <p className='mb-3 active'>{t('feedback.tooltip.acceptable')}</p> }
          </div>

          <div  onClick={() => handleRatingChange(2)} title={renderTooltip(2)}>
            <FaFrown className={rating === 2 ? "icon active" : "icon"} />
            <p  className={`${rating === 2 && 'active'}`}  >{t('feedback.tooltip.bad')} </p>
          </div>

          {
            /**
             *           <div  onClick={() => handleRatingChange(1)} title={renderTooltip(1)}>
            <FaSadTear className={rating === 1 ? "icon active" : "icon"} />
            <p  className={`${rating === 1 && 'active'}`}  >سيء جداً</p>
          </div>
             */
          }


      </div>
     
         {error ? <p className='text-danger  '>{t('feedback.tooltip.text_danger')}</p> : <span></span>
         /** <p className='text-rating ' >  <span >{renderTooltip(rating)}</span></p> } */
}

      </div>

  );
};

export default OpinionComponent;
