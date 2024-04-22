/* eslint-disable react/prop-types */

const TitleSection = ({title_ar,title_amz,animation,Icon_1,Icon_2}) => {


  return (  <div   className={` ${animation}  title-size-device animate__animated animate__fadeIn text-center  pb-3 pt-2`} >
      <h2 > {Icon_1} {title_ar} {!Icon_2 ? Icon_1 : Icon_2} </h2>
      <h5  >{title_amz} </h5>
    </div>
  );

}

  export default TitleSection
  