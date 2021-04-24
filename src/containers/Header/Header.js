import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Navbar,
  Form,
  Col,
  FormControl,
  Button,
} from "react-bootstrap";

import { useDispatch, useSelector } from 'react-redux'
import { updateSearchTerm, selectSubreddit } from '../Feed/feedSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const subreddit = useSelector(selectSubreddit);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateSearchTerm(searchTerm)
    );
    setSearchTerm('');
  }

  const handleKeyPress = (e) => {
    if(e.key === "Enter"){
      handleSearchSubmit(e);
    }
  }

  return (
    <Navbar id="navbar" bg="light" sticky="top">
      <Container>
        <div id='brand'>  
            <Link className='no-decor' to='/r/popular'><p id='page-title'>RedditMono</p></Link>
            <Link className='no-decor' to={`/${subreddit}`}><span id='subreddit'>/{subreddit}</span></Link>         
        </div>
        <Form>
          <Form.Row>
            <Col>
              <FormControl
                id='searchField'
                type="text"
                placeholder="Search"
                className=""
                value={searchTerm}
                onKeyPress={handleKeyPress}
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
