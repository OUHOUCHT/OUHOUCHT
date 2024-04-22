import React, { useState } from 'react';
import { MdStarPurple500 } from "react-icons/md";
import { Form, Row, Col, Button, Container, Modal } from 'react-bootstrap';
import TitleSection from '../../components/TitleSection/TitleSection';
import './Feedback.css'; // Import your CSS file for styling
import { HiSave } from "react-icons/hi";
import OpinionComponent from '../OpinionComponent/OpinionComponent';
import { TiInfoLargeOutline } from "react-icons/ti";
import { TbDatabaseCog } from "react-icons/tb";
import { TiInfoOutline } from "react-icons/ti";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    listValue: '',
    textAreaValue: ''
  });

  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
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
    if (form.checkValidity() && rating !== 0) {
      // Do something with form data, like submit it to a server
      console.log({...formData, rating : rating ===0 ? 'الإمتناع' : renderTooltip(rating) });


      setShowModal(true);

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

    } else {
      e.stopPropagation(); // Prevent default submission if form is invalid
    }
  };

  return (
    <Container className="container-content">
      <TitleSection Icon_1={<MdStarPurple500 />} title_ar="الدفتر الذهبي الإلكتروني" title_amz="ⴰⴷⴼⵔⴽ ⴰⵎⵓⴷⴷⴰⵡⵉ ⵏ ⵜⴰⵢⵏⵏⴰⵏ ⵜⵓⵜⵓⵔⵓⵏⵉ" />
      <div className=' mt-4 feedback-container d-flex flex-row justify-content-center align-items-center' >
        <Form onSubmit={handleSubmit}>
        <OpinionComponent rating={rating} handleRatingChange={handleRatingChange} renderTooltip={renderTooltip} />
          <Form.Group className="my-2" as={Row} controlId="formFirstNameLastName">
            <Form.Label>الاسم والنسب</Form.Label>
            <Col sm={15}>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder='ادخل الاسم والنسب '
                required
                isInvalid={formData.name.trim() === ''}
              />
              <Form.Control.Feedback type="invalid">
              الاسم والنسب مطلوب
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
                onChange={handleChange}
                required
                isInvalid={formData.phoneNumber.trim() === ''}
              />
              <Form.Control.Feedback type="invalid">
                رقم الهاتف مطلوب
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group className="my-2" as={Row} controlId="formEmail">
            <Form.Label>البريد الالكتروني</Form.Label>
            <Col sm={15}>
              <Form.Control
              placeholder='ادخل البريد الالكتروني'
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                isInvalid={formData.email.trim() === ''}
              />
              <Form.Control.Feedback type="invalid">
                البريد الالكتروني مطلوب
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
                الهيئة مطلوبة
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
                
              />
            </Col>
          </Form.Group>

          <Form.Group className="my-2 d-flex flex-row justify-content-center align-items-center text-center" controlId="formSubmitButton">
            <Button
              size="sm"
              className="awesome-button"
              variant="secondary"
              type="submit"
            >
              <span style={{ fontSize: 15 }}> <HiSave size={22} /> احفظ</span>
            </Button>
          </Form.Group>
          <div className='text-right mt-3'> {rating === 0 && <div  className={`animate__animated animate__heartBeat`}><TiInfoOutline color='red' size={25} /> <Form.Text className="text-danger"> يرجى إبداء رأيك بتقييم أعلاه </Form.Text></div>}</div>

        </Form>

        {/* Modal for success message */}
          <Modal  style={{textAlign:'center'}} show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton   style={{textAlign:'right'}}  >
          </Modal.Header>
          <Modal.Body> <TbDatabaseCog  size={30}  className='mb-3' /> <br />  تمت عملية التقييم بنجاح </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              إغلاق
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </Container>
  );
};

export default Feedback;
