import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/esm/Navbar';
import Nav from 'react-bootstrap/esm/Nav';
import Container from 'react-bootstrap/esm/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import Badge from 'react-bootstrap/esm/Badge';

import { Store } from './Store';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import SigninPage from './pages/SigninPage';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className='d-flex flex-column app-container'>
        <header>
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
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-4'>
            <Routes>
              <Route path='/signin' element={<SigninPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/product/:slug' element={<ProductPage />} />
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
