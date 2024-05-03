import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa'; // Import the FontAwesome icon

const NotFound = () => {
  return (
    <Container className="container-content">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="text-center">
          <FaExclamationTriangle size={50} color="#DEB870" className="animate__animated animate__shakeX mb-4" />
          <h2 className="animate__animated animate__fadeIn">Error 404 Not Found</h2>
          <p className="animate__animated animate__fadeIn">
          الصفحة غير موجودة 
          </p>
          <Button as={Link} to="/" variant="light" className="animate__animated animate__fadeIn">
            العودة إلى الصفحة الرئيسية
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
