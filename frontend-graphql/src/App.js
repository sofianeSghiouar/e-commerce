import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Container,
  Nav,
  Navbar,
  Badge,
  NavDropdown
} from 'react-bootstrap/esm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Store } from './Store';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';


import ShippingAddressPage from './pages/ShippingAddressPage';
import PaymentPage from './pages/PaymentPage';

      function App() {
  const { state, dispatch: storeDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const logoutHandler = () => {
    storeDispatch({ type: 'USER_LOGOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
  };

  return (
    <BrowserRouter>
      <div className='d-flex flex-column app-container'>
        <header>
          <ToastContainer position='bottom-center' limit={1} />
          <Navbar bg='dark' variant='dark'>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>The Good Deals</Navbar.Brand>
              </LinkContainer>
              <Nav>
                <Link to='/cart' className='nav-link'>
                  <i
                    className={`typcn typcn-shopping-cart icon-cart ${
                      cart.cartItems.length > 0 ? 'text-warning' : 'text-light'
                    }`}
                  >
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg='danger' className='cart-items-badge'>
                        {cart.cartItems.reduce((a, item) => {
                          return a + item.quantity || 0;
                        }, 0)}
                      </Badge>
                    )}
                  </i>
                </Link>
                {userInfo ? (
                  <NavDropdown
                    title={userInfo.username}
                    id='basic-nav-dropdown'
                    className='nav-link'
                  >
                    {' '}
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/orderHistory'>
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      to='/'
                      className='dropdown-item'
                      onClick={logoutHandler}
                    >
                      Logout
                    </Link>
                  </NavDropdown>
                ) : (
                  <Nav.Item className='nav-link align-self-center'>
                    <Link to={'/login'} className='nav-link'>
                      Login
                    </Link>
                  </Nav.Item>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-4'>
            <Routes>
              <Route path='/cart' element={<CartPage />} />
              <Route path='/product/:slug' element={<ProductPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/shipping' element={<ShippingAddressPage />} />
              <Route path='/payment' element={<PaymentPage />} />
              <Route path='/' element={<HomePage />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center'>All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
