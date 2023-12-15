/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { Form, FormGroup, Button, Row, Col } from 'react-bootstrap';
import { BiSearch, BiX } from 'react-icons/bi';

const SearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <Form onSubmit={handleSearch} className="animate__animated animate__fadeIn mt-2  mb-5"  >
      <FormGroup>
        <Form.Label htmlFor="search-input">البحث حسب الكلمة المفتاحية:</Form.Label>
        <Row className="">
          <Col  md={8} sm={10}   lg={5}>
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="أدخل العنوان"
              className="form-control"
              id="search-input"
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col >
            <Button type="submit" variant="primary" >
              <BiSearch />
              &nbsp;بحث
            </Button>
            <Button type="button" variant="secondary" onClick={handleClear} className="mx-2">
              <BiX />
              &nbsp;الغاء
            </Button>
          </Col>
        </Row>
      </FormGroup>

    </Form>
  );
};

export default SearchForm;
