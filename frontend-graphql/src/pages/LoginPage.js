import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap/esm';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Store } from '../Store.js';
import getErrorMessage from '../utils/errorsHandler.js';
import queryFetch from '../utils/queryHandler.js';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const navigate = useNavigate();

  const { state, dispatch: storeDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    const queryOptions = {
      query: `
      query($loginInput: LoginInput){
                userLogin(loginInput: $loginInput){
                  id
                  username
                  email
                  isAdmin
                  token
                }
              }
      `,
      variables: { loginInput: { email, password } },
    };

    try {
      const result = await queryFetch(queryOptions);
      const {
        data: { data:{ userLogin }},
      } = result;
      console.log('userLogin :>> ', userLogin);

      if (userLogin) {
        storeDispatch({ type: 'USER_LOGIN', payload: userLogin });
        localStorage.setItem('userInfo', JSON.stringify(userLogin));
        navigate(redirect || '/');
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  return (
    <div>
      <Container className='small-container'>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <h1 className='my-3'>Login</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-5' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Row className='flex-column'>
            <Col className='mb-5 text-center d-grid'>
              <Button type='submit'>Login</Button>
            </Col>
            <Col className='mb-3 text-center '>
              New to The Good Deal?{' '}
              <Link to={`/login?redirect=${redirect}`}>Create an account</Link>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default LoginPage;
