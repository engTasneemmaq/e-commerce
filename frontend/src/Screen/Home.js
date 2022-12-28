import axios from 'axios';
import React,{useState, useEffect, useReducer} from 'react'
import { Col, Row } from 'react-bootstrap';
import logger from 'use-reducer-logger';
import Product from '../components/Product';
// import data from '../data';

//define reducer function

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Home() {
  //replace state hook to reducer hook>>>>>>>>>>>>>>
  //use reducer>>>
  const [{loading, error, products},
     dispatch]= useReducer(logger(reducer),{
    products:[],
    loading: true,
    error: '',
  } )

  //use dispstch to update state>>>>
  useEffect(() => {
  const fetchData = async ()=>{
    dispatch({type: 'FETCH_REQUEST'});
    try{
      const result = await axios.get ('/api/products')
      dispatch({type: 'FETCH_SUCCESS', payload: result.data});
    
    }catch(err){
      dispatch({type: 'FETCH_FAIL', payload: err.message});
    }
  };
  fetchData();
  }, []);

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // const [products, setProducts] = useState([]);
  // fetch data from backend using axios
  // useEffect(() => {
  // const fetchData = async ()=>{
  //   const result = await axios.get ('https://e-commerce-backend-production-913d.up.railway.app/product')
  // setProducts(result.data);
  // };
  // fetchData();
  // }, []);
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  return (
    <div>
        <h1>Featured Products</h1>
      <div className="products">
      {loading ? (
          <div>Loading....</div>
          ) : error ? (
        <div>{error}</div>
        ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.slug} sm={3} md={5} lg={3} className="mb-3">
           <Product product={product}></Product>
            </Col>
          ))}
        </Row>
  )}
      </div>
    </div>
  )
}

export default Home;