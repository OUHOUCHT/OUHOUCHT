/* eslint-disable react/prop-types */
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap';

const Breadcrumb_ = ({ title }) => (
  
          <Breadcrumb className='mb-5' >
               <LinkContainer to="/">
                <Breadcrumb.Item>الصفحة الرئيسية</Breadcrumb.Item>
              </LinkContainer>
              <Breadcrumb.Item active>{title}</Breadcrumb.Item>
              
          </Breadcrumb>
  );

  export default Breadcrumb_;