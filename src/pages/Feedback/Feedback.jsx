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
import { useTranslation } from 'react-i18next';
import es  from  '../../assets/es.svg';
import fr  from  '../../assets/fr.svg';
import ma  from  '../../assets/ma.svg';
import gb  from  '../../assets/gb.svg';

const Feedback = () => {
  const { t ,i18n} = useTranslation(); // Access translation functions

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    listValue: '',
    textAreaValue: '',
    nameTextAreaValue :''
  });

  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const errorDivRef = useRef(null);

  const [showModal, setShowModal] = useState({
    open : false,
    title : "",
    error :'',
    operaionStatus : ""
  });

  const handleCloseModal = () => {
    setShowModal(prev => ({ ...prev, open: false }));
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const renderTooltip = (rating) => {
    switch (rating) {
      case 1:
        return t('feedback.tooltip.very_bad');
      case 2:
        return t('feedback.tooltip.bad');
      case 3:
        return t('feedback.tooltip.acceptable');
      case 4:
        return t('feedback.tooltip.good');
      case 5:
        return t('feedback.tooltip.excellent');
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendFeedback = async (form, data) => {
    try {
      setLoading(true);

      const response = await fetch('https://ebureau.chambredesconseillers.ma/sielcc/api.php?endpoint=sendFeedBack', {
        method: 'POST',
        headers: {
          'Api-Key': '6c92e935dc096ab028081a1262e927cf3c10f6df8ccf247ba65821ca052a29ab',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setLoading(false);

      if (result.error) {
        setShowModal(prev => ({
          ...prev,
          open: true,
          title: t('feedback.modal.error_title'),
          error: result.error,
          operaionStatus: 2
        }));
        return;
      }

      setShowModal(prev => ({
        ...prev,
        error: "",
        open: true,
        title: t('feedback.modal.success_title'),
        operaionStatus: 1
      }));

      form.reset();
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        listValue: '',
        textAreaValue: '',
        nameTextAreaValue:''
      });
      setRating(0);

    } catch (error) {
      console.error(error);

      setLoading(false);

      setShowModal(prev => ({
        ...prev,
        open: true,
        title: t('feedback.modal.error_title'),
        error: error.message,
        operaionStatus: 2
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (form.checkValidity()) {
      if (rating === 0) {
        errorDivRef.current.focus();
        errorDivRef.current.classList.add('animate__heartBeat');
        setTimeout(() => {
          errorDivRef.current.classList.remove('animate__heartBeat');
        }, 1000);
      } else {
        const data = { ...formData, rating: rating === 0 ? t('feedback.tooltip.abstain') : renderTooltip(rating) };
        sendFeedback(form, data);
      }
    } else {
      e.stopPropagation();
    }
  };

  const handleLanguage = (code) => {

    i18n.changeLanguage(code);

  };

  return (
    <Container className="container-content" style={{textAlign:i18n.language !== "ar" ? 'left' :"right"}} lang={i18n.language} dir={ i18n.language === "ar" ? "rtl" : "ltr"}>
      <TitleSection Icon_1={<MdStarPurple500 color='#E4AA3A' />} title_ar={t('feedback.title_ar')} title_amz={t('feedback.title_amz')} />

      {/* Language selection icons */}
      <div className='flags-icons'  >
        <img onClick={() => { handleLanguage('ar') }} src={ma}   alt="fi-ma"  />
        <img onClick={() => { handleLanguage('es') }} src={es}   alt="fi-es" />
        <img onClick={() => { handleLanguage('fr') }} src={fr}   alt="fi-fr" />
        <img onClick={() => { handleLanguage('en') }} src={gb}  alt="fi-gb" />
      </div>

      <Form className='mt-4 feedback-container' onSubmit={handleSubmit}>
        <Row>
          <p className='rating-response'>{t('feedback.question')}</p>
        </Row>

        <Row dir='rtl' tabIndex={-1} ref={errorDivRef} className='pb-3  animate__animated text-center'>
          <OpinionComponent error={rating === 0} rating={rating} handleRatingChange={handleRatingChange} renderTooltip={renderTooltip} />
        </Row>

        <Row> 
            <Form.Group as={Row} controlId="formFirstNameLastName">
            <Form.Label>{t('feedback.form_label_name')}</Form.Label>
            <Col sm={15}>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('feedback.placeholder_name')}
                className="custom-placeholder" // Apply custom CSS class
                //required
                //isInvalid={formData.name.trim() === ''}
              />
              <Form.Control.Feedback type="invalid">
              {t('feedback.error_name_required')}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

            </Row>
            <Row>

          <Form.Group className="my-2" as={Row} controlId="formPhoneNumber">
          <Form.Label>{t('feedback.form_label_phone')}</Form.Label>
            <Col sm={15}>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder={t('feedback.placeholder_phone')}
                className="custom-placeholder" // Apply custom CSS class
                onChange={handleChange}
                //required
                //isInvalid={formData.phoneNumber.trim() === ''}
              />
              <Form.Control.Feedback type="invalid">
              {t('feedback.error_phone_required')}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          </Row>

          <Row>

          <Form.Group className="my-2" as={Row} controlId="formEmail">
          <Form.Label>{t('feedback.form_label_email')}</Form.Label>
            <Col sm={15}>
              <Form.Control
                placeholder={t('feedback.placeholder_email')}
                className="custom-placeholder" // Apply custom CSS class
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                isInvalid={formData.email.trim() === ''}
              />
              <Form.Control.Feedback type="invalid">
              {t('feedback.error_email_required')}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          </Row>

          <Row>

          <Form.Group className="my-2" controlId="formList">
          <Form.Label>{t('feedback.form_label_list')}</Form.Label>
            <Col sm={15}>
              <Form.Control
                as="select"
                name="listValue"
                value={formData.listValue}
                onChange={handleChange}
                className="custom-select" // Apply custom CSS class
               // required
               // isInvalid={formData.listValue.trim() === ''}
              >
                <option value="">{t('feedback.listValue.default')}</option>
                <option value="مؤسسة دستورية">{t('feedback.listValue.option1')}</option>
                <option value="ادارة">{t('feedback.listValue.option2')}</option>
                <option value="مؤسسة تعليمية">{t('feedback.listValue.option3')}</option>
                <option value="جمعية">{t('feedback.listValue.option4')}</option>
                <option value="زائر">{t('feedback.listValue.option5')}</option>
                <option value="أخر">{t('feedback.listValue.option6')}</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
              {t('feedback.error_list_required')}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          </Row>

          <Row>
          <Form.Group className="my-2" as={Row} controlId="FormNameList">
          <Form.Label>{t('feedback.form_label_list_name')}</Form.Label>
            <Col sm={15}>
              <Form.Control
                type="text"
                name="nameTextAreaValue"
                value={formData.nameTextAreaValue}
                placeholder={t('feedback.placeholder_list_name')}
                className="custom-placeholder" // Apply custom CSS class
                onChange={handleChange}
                required={formData.listValue.trim() !== ''}
                isInvalid={formData.listValue.trim() !== ''}
              />
              <Form.Control.Feedback type="invalid">
              {t('feedback.error_list_name_required')}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          </Row>


          <Row>

          <Form.Group className="my-2" controlId="formTextArea">
          <Form.Label>{t('feedback.form_label_opinion')}</Form.Label>
            <Col sm={11}>
              <Form.Control
                as="textarea"
                rows={3}
                name="textAreaValue"
                value={formData.textAreaValue}
                onChange={handleChange}
                placeholder={t('feedback.placeholder_opinion')}
                className="custom-placeholder" // Apply custom CSS class
                required
                isInvalid={formData.textAreaValue.trim() === ''}
              />
              <Form.Control.Feedback type="invalid">
              {t('feedback.error_opinion_required')}
              </Form.Control.Feedback>
             
            </Col>
          </Form.Group>
          </Row>
          <Row>

          <Form.Group className="my-2 d-flex flex-row justify-content-center align-items-center text-center" controlId="formSubmitButton">
            <Button
              size="lg"
              className="awesome-button"
              type="submit"
              variant='secondary'
            >
              <span> <BsSendCheck  />  {t('feedback.button_save')} </span>
            </Button>
          </Form.Group>
          </Row>


        </Form>      

      {/* Modal for alert message */}
      <Modal style={{ textAlign: 'center' }} show={showModal.open} onHide={handleCloseModal}>
        <Modal.Header closeButton style={{ textAlign: 'right' }} />
        <Modal.Body className='mb-2' style={{ color: showModal.operaionStatus !== 1 ? 'red' : "green", fontSize: 20 }}>
          {showModal.operaionStatus === 1 ? <FaCheck size={40} className='mb-1' /> : <BiError size={40} className='mb-1' />}
          <br />{showModal.title}<br />{showModal.error}
        </Modal.Body>
      </Modal>

      {loading && <LoadingComponent />}
    </Container>
  );
};

export default Feedback;
