/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Home.css';

const Home = () => {
  const PublicationCard = ({ title, subtitle, id }) => (
    <Col className="animate__animated animate__zoomIn mb-3">
      <Link to={`/container/${encodeURIComponent(title)}`} className="text-decoration-none  text-center text-light w-100">
        <Card className="h-100">
          <Card.Body id={id} className="d-flex flex-column">
            <div className="pub-size-device text-light">
              <Card.Title  > {title}</Card.Title>
              <Card.Title   > {subtitle}</Card.Title>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );

  return (
    <div className="container-content" id="home" >
      <div className="title-size-device text-center animate__animated animate__fadeIn pb-5 py-4" >
        <h2 > إصدارات البرلمان</h2>
        <h2> ⵜⵉⵥⵕⵉⴳⵉⵏ ⵏ ⵓⴱⵕⵍⴰⵎⴰⵏ</h2>
      </div>

      <Container className=''>
        <Row xs={1} md={2}  >
          <PublicationCard
            id="chambre_rep"
            title="إصدارات مجلس النواب" 
            subtitle="ⵜⵉⵥⵕⵉⴳⵉⵏ ⵏ ⵓⵙⵇⵇⵉⵎ ⵏ ⵉⵎⵓⵔⴰ"
          />

          <PublicationCard
            id="chambre_cons"
            title="إصدارات مجلس المستشارين"
            subtitle="ⵜⵉⵥⵕⵉⴳⵉⵏ ⵏ ⵓⵙⵇⵇⵉⵎ ⵏ ⵉⵎⵛⵛⵉⵡⴰⵕ"
          />
        </Row>
      </Container>
    </div>
  );
};

export default Home;
