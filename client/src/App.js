import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import AllOrders from './screens/AllOrders';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };

  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <ToastContainer
          position='top-center'
          limit={1}
        />
        <header>
          <Navbar
            bg='dark'
            variant='dark'>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>Store</Navbar.Brand>
              </LinkContainer>
              <Nav className='me-auto'>
                <Link
                  to='/cart'
                  className='nav-link'>
                  Cart:
                  {cart.cartItems.length > 0 && (
                    <Badge
                      pill
                      bg='danger'>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown
                    title={userInfo.name}
                    id='basic-nav-dropdown'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/orderhistory'>
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className='dropdown-item'
                      to='#signout'
                      onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link
                    className='nav-link'
                    to='/signin'>
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route
                path='/product/:slug'
                element={<ProductScreen />}
              />
              <Route
                path='/cart'
                element={<CartScreen />}
              />
              <Route
                path='/signin'
                element={<SigninScreen />}
              />
              <Route
                path='/signup'
                element={<SignupScreen />}
              />
              <Route
                path='/shipping'
                element={<ShippingAddressScreen />}
              />
              <Route
                path='/placeorder'
                element={<PlaceOrderScreen />}
              />
              <Route
                path='/order/:id'
                element={<OrderScreen />}
              />
              <Route
                path='/payment'
                element={<PaymentMethodScreen />}
              />
              <Route
                path='/'
                element={<HomeScreen />}
              />
              <Route
                path='/orders'
                element={<AllOrders />}
              />
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
