import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import getErrorMessage from '../utils/errorsHandler';
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

  const { state, dispatch: storeDispatch } = useContext(Store);

  const {
    userInfo,
    cart: { cartItems }
  } = state;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords does not match');
      return;
    }
    const queryOptions = {
      query: `
        mutation($registerInput: RegisterInput){
            userRegister(registerInput: $registerInput){
                id
                username
                email
                isAdmin
            }
        }
        `,
      variables: {
        registerInput: {
          username: name,
          email,
          password,
          confirmPassword
        }
      }
    };

    queryFetch(queryOptions)
      .then((result) => {
        const {
          data: {
            data: { userRegister }
          }
        } = result;
        if (userRegister) {
          storeDispatch({ type: 'USER_REGISTER', payload: userRegister });
          localStorage.setItem('userInfo', JSON.stringify(userRegister));
          cartItems.length > 0
            ? navigate('/shipping')
            : navigate(redirect || '/');
          return;
        }
        toast.error(getErrorMessage(result));
      })
      .catch((error) => {
        throw new Error(error);
      });
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
          <Form.Group
            className='mb-3'
            controlId='password'
            autoComplete='new-password'
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className='mb-5'
            controlId='confirmPassword'
            autoComplete='new-password'
          >
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
