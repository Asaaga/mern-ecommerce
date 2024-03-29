import { Helmet } from "react-helmet-async";
import Product from '../components/Product'
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import axios from 'axios';
import { useEffect, useReducer } from "react";

import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        loading: true
      };
      case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload,
        loading: false
      };
      case 'FETCH_FAIL':
      return {
        ...state,
        error: action.payload,
        loading: false
      }; 
      default: 
        return state;
  }
}

export default function HomeScreen() {

  const [{loading, error, products}, dispatch] = useReducer(logger(reducer), {
    loading: false,
    error: '',
    products: []
  });
  

// const [products, setProducts] = useState([]);

useEffect(()=>{
  const fetchData = async () => {
    dispatch({type: 'FETCH_REQUEST'})
    try {
      const result = await axios.get('/api/products')
      dispatch({type: 'FETCH_SUCCESS', payload: result.data})
    } catch(err) {
        dispatch({type: 'FETCH_FAIL', payload: err.message})
    }
  }
  fetchData();
}, [])

  return (
    <div>
      <Helmet>
        <title>Store</title>
      </Helmet>
       <h1>Featured Products</h1>
          <div className="products">
          {
            loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <Row>
               { products.map(product => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product} />  
                </Col>
                  )) }
              </Row> 
            )} 
          </div>
      </div>
  )
}
