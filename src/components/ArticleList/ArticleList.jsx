/* eslint-disable react/prop-types */
import {Col ,Row ,Card ,Button ,Modal , Spinner } from 'react-bootstrap';
import { IoMdDownload } from "react-icons/io";
import { FaQrcode ,FaInfoCircle } from "react-icons/fa";
import { useState } from 'react';
import './ArticleList.css'
import LoadingBar  from '../LoadingBar.jsx'
import Image from 'react-bootstrap/Image';

const ArticleList = ({ articles ,searchTerm  ,loading}) => {


  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [modalImageLoaded, setModalImageLoaded] = useState(false); // New state for modal image loading


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

  const highlightSearchTerm = (title) => {
  const trimmedSearchTerm = searchTerm.trim();
  
    /** 
     * 'ig': These are flags for the regular expression:
     *  i: Case-insensitive matching (makes the search case-insensitive).
     *  g: Global matching (matches all occurrences, not just the first one).
     * 
    */

    if (trimmedSearchTerm && title.toLowerCase().includes(trimmedSearchTerm.toLowerCase())) {
      const regex = new RegExp(`(${trimmedSearchTerm})`, 'ig');
      return title.split(regex).map((part, index) => (
        index % 2 !== 0 ? <span key={index} className="highlighted-search-term">{part}</span> : part
      ));
    }
    return title;
  };
  

  if (loading) {
    return  <LoadingBar />
  }


  return (
    <div  id='ArticleList' className='my-5'>
      { articles.length === 0  ?  
      <Row className="mt-4 animate__animated animate__fadeIn "  >
      <Col style={{ display: 'flex', justifyContent:'start',alignItems: 'center',}}>
        <FaInfoCircle size={24} style={{ marginLeft: '8px' }} color='gray' />
        <p style={{ margin: 0 }}>
          عذرا لم يتم العثور على أي إصدار يرجى المحاولة مرة أخرى.
        </p>
      </Col>
      </Row>
     : 
     <div className='container'>
      <Row xs={1}  sm={2} md={3} lg={3} className="g-4" >
      {articles.map((article) => (
        <Col key={article.id}   className='d-flex justify-content-center' >
          <Card   className="card animate__animated animate__zoomIn">
        
            {!imageLoaded && (
            <div className='loading-spinner-container d-flex flex-row justify-content-center align-items-center'>
                <Spinner animation="border" variant="primary" size="lg" />
            </div>
            )}
       
            <Card.Img 
            className={`animate__animated animate__zoomIn  ${imageLoaded ? 'image-loaded' : 'image-not-loaded'}`}
            variant="top" 
            src={article.bg_img_url} 
            alt={article.title} 
            onLoad={handleImageLoad} 
            loading="lazy"  
            decoding="async" /> 

            <Card.Body   className='card-body d-flex flex-column justify-content-between '>

              <Card.Title   >
                 {highlightSearchTerm(article.title)}
              </Card.Title>

              <div  className='d-flex flex-row justify-content-center'>
                {/*   href={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(article.url)}`} */}
                <Button  size='sm'  rel="noopener noreferrer" className="animate__animated animate__heartBeat mx-1"  variant="primary" href={article.pdf_link} target='_blank'>
                    <IoMdDownload size={18} /></Button>
                 <Button
                      size='sm'
                      className="animate__animated animate__heartBeat"
                      variant="secondary"
                      onClick={() => toggleModal(article)}
                    >
                      <FaQrcode size={18} />
                    </Button>
                
               </div>


 {/**
  *                <div className='image-container'>
                <div class="text">

</div>
</div>
  */}

            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
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
                selectedArticle.pdf_link
              )}`}
              alt="QR Code"
              className={`animate__animated animate__zoomIn ${modalImageLoaded ? 'modal-loaded' : 'modal-not-loaded'} `}
              onLoad={handleModalImageLoad}
              loading="lazy"  
              decoding="async" />             

            <p  className='card-title-modal'>
              {(selectedArticle.title)}
            </p>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default ArticleList;
