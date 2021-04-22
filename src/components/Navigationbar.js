import React, { useState } from "react";
import {
  Container,
  Navbar,
  Form,
  Col,
  FormControl,
  Button,
} from "react-bootstrap";

import { useDispatch } from 'react-redux'
import { updateSearchTerm } from '../features/post/postSlice';

export const Navigationbar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateSearchTerm(searchTerm)
    )
  }

  return (
    <Navbar id="navbar" bg="light">
      <Container>
        <Navbar.Brand href="#home">monoReddit</Navbar.Brand>
        <Form>
          <Form.Row>
            <Col>
              <FormControl
                type="text"
                placeholder="Search"
                className=""
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
              ></FormControl>
            </Col>
            <Col>
              <Button variant="outline-dark" onClick={handleSearchSubmit}>
                <i className="bi bi-search"></i>
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Container>
    </Navbar>
  )
};
