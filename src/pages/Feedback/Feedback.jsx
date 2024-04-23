import React, { useEffect, useRef, useState } from 'react';
import { MdStarPurple500 } from "react-icons/md";
import { Form, Row, Col, Button, Container, Modal } from 'react-bootstrap';
import TitleSection from '../../components/TitleSection/TitleSection';
import './Feedback.css'; // Import your CSS file for styling
import OpinionComponent from '../OpinionComponent/OpinionComponent';
import { BiError } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { BsSendCheck } from "react-icons/bs";
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    listValue: '',
    textAreaValue: ''
  });

  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [showRatingError, setShowRatingError] = useState(false);
  const errorDivRef = useRef(null);

  const [showModal, setShowModal] = useState({
    open : false,
    title : "",
    error :'',
    operaionStatus : ""
  });

  const handleCloseModal = () => {
    setShowModal( prev =>  ({
      ...prev,
      open : false
    }));
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const renderTooltip = (rating) => {
    switch (rating) {

      case 1:
        return "سيء جداً";
      case 2:
        return "سيء";
      case 3:
        return "مقبول";
      case 4:
        return "جيد";
      case 5:
        return "ممتاز";
      default:
        return "";
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = e.currentTarget;

    if (form.checkValidity() ) {

      if(rating !== 0){
        // Do something with form data, like submit it to a server
        const data = {...formData, rating : rating ===0 ? 'الإمتناع' : renderTooltip(rating) }

        setLoading(true);

        const sendFeedBack = async () => {
          try {

          const response = await fetch('https://ebureau.chambredesconseillers.ma/sielcc/api.php?endpoint=sendFeedBack', {
              method: 'POST', 
              headers: {
                'Api-Key': '6c92e935dc096ab028081a1262e927cf3c10f6df8ccf247ba65821ca052a29ab',
                'Content-Type': 'application/json', 
              },
              body: JSON.stringify(data), // Convert data object to JSON string
            });

            const result = await response.json();
            setLoading(false);

            if (result.error) {
              setShowModal( () => ({
                open: true,
                title :"تعذر إكمال العملية ",
                error :  result.error,
                operaionStatus: 2

              }));
              return
            }

            setShowModal( () => ({
              error : "",
              open: true,
              title :"تمت العملية بنجاح",
              operaionStatus : 1
            }));

            // Reset the form after successful submission
            form.reset();
            setFormData({
              name: '',
              email: '',
              phoneNumber: '',
              listValue: '',
              textAreaValue: ''
            });
            setRating(0);

          } catch (result) {

            setLoading(false);

            setShowModal( () => ({
              open: true,
              title :"تعذر إكمال العملية ",
              error :  result.error,
              operaionStatus: 2
            }));

          } 
        };

        sendFeedBack()
        setShowRatingError(false)


      }else{

      setShowRatingError(true);

      }
      
    } else {
      e.stopPropagation(); // Prevent default submission if form is invalid
      // Show error message animation when rating is 0
      setShowRatingError(true);
    }
  };



  useEffect(() => {
    if (showRatingError && errorDivRef.current) {
      errorDivRef.current.focus();
    }
  }, [showRatingError]);


  return (
    <Container className="container-content">
      <TitleSection Icon_1={<MdStarPurple500  color='#E4AA3A' />} title_ar="الدفتر الذهبي الإلكتروني" title_amz="ⴰⴷⴼⵔⴽ ⴰⵎⵓⴷⴷⴰⵡⵉ ⵏ ⵜⴰⵢⵏⵏⴰⵏ ⵜⵓⵜⵓⵔⵓⵏⵉ" />
      <div className=' mt-4 feedback-container d-flex flex-row justify-content-center align-items-center' >
        <Form onSubmit={handleSubmit}>
        <h4 className='text-center'>أخبرنا برأيك ؟</h4>
        <div  className="text-right mt-3">
            {rating === 0 && <div><Form.Text className="text-danger"> * يرجى إبداء رأيك بخصوص رواق البرلمان  </Form.Text></div>}
          </div>
          <Form.Group className="my-2" as={Row} controlId="formFirstNameLastName">
            <Form.Label>الاسم والنسب</Form.Label>
            <Col sm={15}>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder='ادخل الاسم والنسب '
                className="custom-placeholder" // Apply custom CSS class
                required
                isInvalid={formData.name.trim() === ''}
              />
              <Form.Control.Feedback type="invalid">
              * الاسم والنسب مطلوب 
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group className="my-2" as={Row} controlId="formPhoneNumber">
            <Form.Label>رقم الهاتف </Form.Label>
            <Col sm={15}>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder='ادخل رقم الهاتف'
                className="custom-placeholder" // Apply custom CSS class
                onChange={handleChange}
                required
                isInvalid={formData.phoneNumber.trim() === ''}
              />
              <Form.Control.Feedback type="invalid">
              *  رقم الهاتف مطلوب
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group className="my-2" as={Row} controlId="formEmail">
            <Form.Label>البريد الالكتروني</Form.Label>
            <Col sm={15}>
              <Form.Control
                placeholder='ادخل البريد الالكتروني'
                className="custom-placeholder" // Apply custom CSS class
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                isInvalid={formData.email.trim() === ''}
              />
              <Form.Control.Feedback type="invalid">
              *  البريد الالكتروني مطلوب
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group className="my-2" controlId="formList">
            <Form.Label>الهيئة </Form.Label>
            <Col sm={15}>
              <Form.Control
                as="select"
                name="listValue"
                value={formData.listValue}
                onChange={handleChange}
                className="custom-select" // Apply custom CSS class
                required
                isInvalid={formData.listValue.trim() === ''}
              >
                <option value="">اختر الهيئة... </option>
                <option value="option1">مؤسسة التعليم الابتدائي</option>
                <option value="option2">مؤسسة التعليم الثانوي الإعدادي</option>
                <option value="option3">مؤسسة التعليم الثانوي التأهيلي</option>

                <option value="option3">مؤسسة جامعية</option>
                <option value="option3">جمعية</option>
                <option value="option3">زائر</option>
                <option value="option3">أخر</option>

              </Form.Control>
              <Form.Control.Feedback type="invalid">
              * الهيئة مطلوبة 
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group className="my-2" controlId="formTextArea">
            <Form.Label>أخبرنا برأيك ؟</Form.Label>
            <Col sm={15}>
              <Form.Control
                as="textarea"
                rows={3}
                name="textAreaValue"
                value={formData.textAreaValue}
                onChange={handleChange}
                placeholder='أكتب رأيك هنا'
                className="custom-placeholder" // Apply custom CSS class
              />
            </Col>
          </Form.Group>

          <Form.Group className="my-2 d-flex flex-row justify-content-center align-items-center text-center" controlId="formSubmitButton">
            <Button
              size="lg"
              className="awesome-button"
              type="submit"
              variant='secondary'
            >
              <span> <BsSendCheck  /> إرسال</span>
            </Button>
          </Form.Group>

        </Form>

        {/* Modal for success message */}
          <Modal  style={{textAlign:'center'}} show={showModal.open} onHide={handleCloseModal}>
          <Modal.Header closeButton   style={{textAlign:'right'}}  >
          </Modal.Header>
          <Modal.Body className='mb-2' style={{color: showModal.operaionStatus !==1 ? 'red' : "green" , fontSize:20}}> {showModal.operaionStatus === 1 ? <FaCheck  size={40}  className='mb-1' /> : <BiError  size={40}  className='mb-1' />}  <br />  {showModal.title}  <br />  {showModal.error}</Modal.Body>
        </Modal>

      </div>

      <div tabIndex={-1} ref={errorDivRef} className={` mt-4 feedback-container   d-flex flex-row justify-content-center align-items-center ${showRatingError ? ' animate__animated animate__heartBeat' : '' } ${(rating === 0 && showRatingError) && 'opinion'} `}  >
        <OpinionComponent rating={rating} handleRatingChange={handleRatingChange} renderTooltip={renderTooltip} />
      </div>

      {loading && <LoadingComponent />} 


    </Container>
  );
};

export default Feedback;
