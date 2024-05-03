import { useState } from "react";
import LoadingBar from "../LoadingBar";
import { FaInfoCircle } from "react-icons/fa";
import {  Button, Card, Col, Row } from "react-bootstrap";
import { GoZoomIn } from "react-icons/go";
import { MdZoomOutMap } from "react-icons/md";

import './ListPhotos.css'

import FullscreenImage from "../FullscreenImage/FullscreenImage";

const ListPhotos = ({ photos}) => {

    const [imageLoaded, setImageLoaded] = useState(false);
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [loadedImages, setLoadedImages] = useState({});

    const openFullscreenImage = (imageUrl) => {
        setFullscreenImage(imageUrl);
    };

    const closeFullscreenImage = () => {
        setFullscreenImage(null);
    };


    const handleImageLoad = () => {
      setImageLoaded(true);
    };




    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Intl.DateTimeFormat('ar', options).format(date);
    };



      return (
        <div  id='ListPhotos' className='my-5'>
          { (photos.length === 0 || (photos.length !== 0 && photos[0]?.id == undefined )) ?   
          <Row className="mt-3 animate__animated animate__fadeIn "  >
          <Col style={{ display: 'flex', justifyContent:'start',alignItems: 'center',}}>
            <FaInfoCircle size={24} style={{ marginLeft: '8px' }} color='gray' />
            <p style={{ margin: 0 }}>
              عذرا لم يتم العثور على أي صورة يرجى المحاولة مرة أخرى.
            </p>
          </Col>
          </Row>
         : 
        <div className='container'>
            <Row xs={1}  sm={3} md={3} lg={3} className="g-4" >
            {photos.map((photo) => (
                <Col key={photo.id}   className='d-flex justify-content-center' >
                <Card   className=" card animate__animated animate__zoomIn">
                  <div className="content-card">
                      <Card.Img 
                      className={`animate__animated animate__zoomIn  ${imageLoaded ? 'image-loaded' : 'image-not-loaded'}`}
                      variant="top" 
                      height={450}
                      src={photo.baseUrl} 
                      alt={photo.filename} 
                      onLoad={handleImageLoad} 
                    //  onClick={() => openFullscreenImage(photo.baseUrl)}
                      /> 

                      <div className="middle">
                        <MdZoomOutMap className="GoZoomIn" onClick={() => openFullscreenImage(photo.baseUrl)}  size={50} />
                      </div>
                  </div>






{ /*
                <Card.Body   className='card-body py-3 d-flex flex-column justify-content-between '>
                <div  className=' d-flex flex-row justify-content-center'>
                 
                    /**
                    <Button
                        className="animate__animated animate__heartBeat"
                        variant="secondary"
                        onClick={() => toggleModal(photo)}
                        >
                        <FaQrcode size={18} />
                    </Button>
                  


                    <Button    rel="noopener noreferrer" className="animate__animated animate__heartBeat mx-1"  variant="primary" href={photo.baseUrl} target='_blank'>
                        <AiOutlineZoomIn size={18} />
                    </Button>
                    
                </div>

                </Card.Body>
                     <Card.Footer className="text-center card-footer" >
                     <span style={{color:'gray'}}>{formatDate(photo.mediaMetadata.creationTime)} </span>
                </Card.Footer>
*/}
           
          </Card>
        </Col>
      ))}
    </Row>

    {fullscreenImage && <FullscreenImage  imageUrl={fullscreenImage} onClose={closeFullscreenImage} />}

    </div>
}
    </div>
  );
};





export  default ListPhotos;