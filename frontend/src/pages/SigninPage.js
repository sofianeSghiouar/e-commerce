import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap/esm';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';

function SigninPage() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  return (
    <div>
      <Container className='small-container'>
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <h1 className='my-3'>Sign In</h1>
        <Form>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' required />
          </Form.Group>
          <Form.Group className='mb-5' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' required />
          </Form.Group>
          <Row className='flex-column'>
            <Col className='mb-5 text-center d-grid'>
              <Button type='submit'>Sign In</Button>
            </Col>
            <Col className='mb-3 text-center '>
              New to The Good Deal?{' '}
              <Link to={`/register?redirect=${redirect}`}>
                Create an account
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default SigninPage;
