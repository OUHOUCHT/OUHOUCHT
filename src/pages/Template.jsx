// Template.jsx

import React, { useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Template.css';
import MediaModal from '../components/MediaModal/MediaModal';
import left_arrow  from '/left-arrow-svgrepo-com.svg';
import TableRowItem from '../components/TableRowItem';
import MediaSection from '../components/MediaSection';

const Template = () => {

  // State for modal
  const [showModal, setShowModal] = useState(false);


    // Function to show the modal
    const handleShowModal = (e) => {
        e.preventDefault();
        setShowModal(true);
      };

  // Function to hide the modal
  const handleCloseModal = () => setShowModal(false);


  return (
    <Container fluid className="main-container">
      {/* First Row with Image Background */}
      <Row className="first-row">
        <Col >
          <img src="/background.jpeg" alt="" className="background-image" />
        </Col>
      </Row>

      {/* Second Row with Table  */}
      <Row className="second-row">
        <Col  className="full-height-table">
          <Table >
            <tbody>
              <tr>
                <TableRowItem link="https://www.parlement.ma/" label="البوابة الإلكترونية" icon={left_arrow} onClick={handleShowModal} />
                {/* Media Section */}
                <MediaSection handleShowModal={handleShowModal} />
                <TableRowItem link="#" label="إصدارات البرلمان" icon={left_arrow} />
              </tr>

              <tr>
                <TableRowItem link="#" label="الصور" icon={left_arrow} />
                <TableRowItem link="#" label="الوثائق" icon={left_arrow} />
              </tr>

              <tr>
                  <TableRowItem link="https://bibliotheque.parlement.ma/" label="المكتبة" icon={left_arrow} />
                  <TableRowItem link="http://portail.parlement.ma:9080/navigator/" label="الأرشيف" icon={left_arrow} />
              </tr>

              {/* Media Modal */}
              <MediaModal showModal={showModal} handleCloseModal={handleCloseModal} />
            
            </tbody>
          </Table>
        </Col>
      </Row>

    </Container>
  );
};

export default Template;
