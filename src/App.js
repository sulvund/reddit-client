import React from "react";
import {
  Container,
  Navbar,
  Form,
  Col,
  FormControl,
  Button,
} from "react-bootstrap";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar id="navbar" bg="light">
        <Container>
          <Navbar.Brand href="#home">monoReddit</Navbar.Brand>
          <Form>
            <Form.Row>
              <Col>
                <FormControl type="text" placeholder="Search" className=""></FormControl>
              </Col>
              <Col>
                <Button variant="outline-dark">S</Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;
