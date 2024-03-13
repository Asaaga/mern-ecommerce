import React, { useRef } from 'react';
// import Order from '../components/Order';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { Row, Table } from 'react-bootstrap';
import logger from 'use-reducer-logger';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const AllOrders = () => {
  const [{ loading, error, orders }, dispatch] = useReducer(logger(reducer), {
    loading: false,
    error: '',
    orders: [],
  });

  console.log(orders);

  // const [orders, setorders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/orders/orders');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  const tableRef = useRef(null);

  return (
    <div>
      <div className='d-flex justify-content-around align-items-center'>
        <h1>All Orders </h1>
        <DownloadTableExcel
          filename='orders table'
          sheet='orderss'
          currentTableRef={tableRef.current}>
          <button className='btn btn-primary'> Export excel </button>
        </DownloadTableExcel>
      </div>
      <div className='orders'>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <Row>
            <div className='px-5 py-5'>
              <Table
                responsive
                striped
                bordered
                hover
                className='mx-5'
                ref={tableRef}>
                <thead>
                  <tr>
                    <th>Order Id</th>
                    <th>Total Amount</th>
                    <th>Payment Method</th>
                    <th>Order Items</th>
                    <th>Shipping Address</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.user}>
                      <td>{order._id}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.paymentMethod}</td>
                      <td>
                        {order.orderItems.map((item) => (
                          <ul key={item.slug}>
                            <li>{item.name}</li>
                            <li>Price: {item.price}</li>
                            <li>Quantity: {item.quantity}</li>
                            <li>ID: {item.product}</li>
                          </ul>
                        ))}
                      </td>
                      <td>
                        <ul>
                          <li>Name: {order.shippingAddress.fullName}</li>
                          <li>Country: {order.shippingAddress.country}</li>
                          <li>City: {order.shippingAddress.city}</li>
                          <li>
                            Postal Code: {order.shippingAddress.postalCode}
                          </li>
                          <li>Address: {order.shippingAddress.address}</li>
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Row>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
