import React, { useState } from 'react';
import { useContext } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import queryFetch from '../utils/queryHandler';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const navigate = useNavigate();

  const {state, dispach: storeDispatch} = useContext(Store)

  const {userInfo} = state;

  // TODO redirect at home in useEffect() if the user is already logged by checking userInfo value

  const submitHandler = (e) => {
    e.preventDefault();
    const queryOptions = {
      query: `
        query($registerInput: RegisterInput){
            userRegister(registerInput: $registerInput){
                username
                email
                isAdmin
            }
        }
        `,
      variables: {
        registerInput: {
          username: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        },
      },
    };

    queryFetch(queryOptions)
      .then((result) => {
        if (result) {
          console.log('result :>> ', result);
          // TODO dispatch payload in store with type 'USER_LOGIN'
        }
        console.log('result false:>> ', result);
      })
      .catch((error) => error.message);
      navigate('/shipping')
  };

  return (
    <div>
      <Container className='small-container'>
        <Helmet>
          <title>Register</title>
        </Helmet>
        <h1 className='my-3'>Register</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-5' controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Row className='flex-column'>
            <Col className='mb-5 text-center d-grid'>
              <Button type='submit'>Register</Button>
            </Col>
            <Col className='mb-3 text-center '>
              Already have an account?{' '}
              <Link to={`/login?redirect=${redirect}`}>Login</Link>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default RegisterPage;
