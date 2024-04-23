import { useState } from "react";
import { FaInfoCircle, FaQrcode } from "react-icons/fa";
import { Button, Card, Col, Modal, Row, Spinner } from "react-bootstrap";
import './ListItems.css'
import { AiOutlineZoomIn } from "react-icons/ai";
import FullscreenImage from "../FullscreenImage/FullscreenImage";
import { MdZoomOutMap } from "react-icons/md";

const ListItems = ({ articles,type}) => {

    const [imageLoaded, setImageLoaded] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [modalImageLoaded, setModalImageLoaded] = useState(false); // New state for modal image loading
  


    const [fullscreenImage, setFullscreenImage] = useState(null);

    const openFullscreenImage = (imageUrl) => {
        setFullscreenImage(imageUrl);
    };

    const closeFullscreenImage = () => {
        setFullscreenImage(null);
    };




  
    const handleImageLoad = () => {
      setImageLoaded(true);
    };
  
  
    const toggleModal = (article) => {
      setSelectedArticle(article);
      setModalImageLoaded(false); // Reset modal image loading state
  
    };
  
    const closeModal = () => {
      setSelectedArticle(null);
      setModalImageLoaded(false);
  
    };
  
  
    const handleModalImageLoad = () => {
      console.log("setModalImageLoaded")
      setModalImageLoaded(true);
    };





    

      return (
        <div  id='ListItems' className='my-5'>
          { articles.length === 0  ?  
          <Row className="mt-3 animate__animated animate__fadeIn "  >
          <Col style={{ display: 'flex', justifyContent:'start',alignItems: 'center',}}>
            <FaInfoCircle size={24} style={{ marginLeft: '8px' }} color='gray' />
            <p style={{ margin: 0 }}>
              عذرا لم يتم العثور على أي {type} يرجى المحاولة مرة أخرى.
            </p>
          </Col>
          </Row>
         : 
        <div className='container'>
            <Row xs={1}  sm={2} md={2} lg={2} className="g-2" >
            {articles.map((article) => (
                <Col key={article.id}   className='d-flex justify-content-center' >
                <Card   className=" card animate__animated animate__zoomIn">
                
                    {!imageLoaded && (
                    <div className='loading-spinner-container d-flex flex-row justify-content-center align-items-center'>
                        <Spinner animation="border" variant="primary" size="lg" />
                    </div>
                    )}
              <div className="content-card">
                  <Card.Img 
                  
                  className={`  animate__animated animate__zoomIn  ${imageLoaded ? 'image-loaded' : 'image-not-loaded'}`}
                  variant="top" 
                  src={article.baseUrl} 
                  alt={article.filename} 
                  onLoad={handleImageLoad} 
                  loading="lazy"  
                  decoding="async"
                //  onClick={() => openFullscreenImage(article.baseUrl)}
                  
                  /> 

                  
                  <div className="middle">
                          <MdZoomOutMap className="GoZoomIn" onClick={() => openFullscreenImage(article.baseUrl)}  size={50} />
                  </div>
                </div>

                <Card.Body   className='card-body d-flex flex-column justify-content-between '>

                <Card.Title className="pulse"><i style={{color:'gray'}} class="fa fa-star  fa-xs"></i> {article.filename} <i style={{color:'gray'}} class="fa fa-star  fa-xs"></i></Card.Title>

                <div  className=' d-flex flex-row justify-content-center'>
                    {/*   href={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(article.url)}`} */}
                    {/* <Button  size='sm'  rel="noopener noreferrer" className="animate__animated animate__heartBeat mx-1"  variant="primary" href={article.baseUrl} target='_blank'>
                        <IoMdDownload size={18} /></Button> */}
                    <Button
                        size='sm'
                        className="animate__animated animate__heartBeat"
                        variant="secondary"
                        onClick={() => toggleModal(article)}
                        >
                        <FaQrcode size={18} />
                        </Button>


                        <Button  size='sm'  rel="noopener noreferrer" className="animate__animated animate__heartBeat mx-1"  variant="primary" href={article.baseUrl} target='_blank'>
                        <AiOutlineZoomIn size={18} /></Button>
                    
                </div>

                </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>


    {fullscreenImage && <FullscreenImage imageUrl={fullscreenImage} onClose={closeFullscreenImage} />}

    </div>
}

{selectedArticle && (
        <Modal show={true} onHide={closeModal} centered  >
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: '14px' }}>QR Code</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center align-items-center flex-column">
            {!modalImageLoaded && (
              <div className="loading-spinner-container d-flex flex-row justify-content-center align-items-center">
                <Spinner animation="border" variant="primary" size="lg" />
              </div>
            )}
          

            <Card.Img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                selectedArticle.baseUrl
              )}`}
              alt="QR Code"
              className={`animate__animated animate__zoomIn ${modalImageLoaded ? 'modal-loaded' : 'modal-not-loaded'} `}
              onLoad={handleModalImageLoad}
              loading="lazy"  
              decoding="async" />             

            <p  className='card-title-modal'>
              {(selectedArticle.filename)}
            </p>
          </Modal.Body>
        </Modal>
      )}

    </div>
  );
};





export  default ListItems;