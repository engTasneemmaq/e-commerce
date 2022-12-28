import React,{useState, useEffect, useReducer} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
    //to git slug from URL use a hook >> useParams from react router dom
    const params = useParams();
    const {slug}= params;


    const [{loading, error, product},
      dispatch]= useReducer(reducer,{
     product:[],
     loading: true,
     error: '',
   } )

    //use dispstch to update state>>>>
  useEffect(() => {
    const fetchData = async ()=>{
      dispatch({type: 'FETCH_REQUEST'});
      try{
        const result = await axios.get (`/api/products/slug/${slug}`)
        dispatch({type: 'FETCH_SUCCESS', payload: result.data});
      
      }catch(err){
        dispatch({type: 'FETCH_FAIL', payload: err.message});
      }
    };
    fetchData();
    }, [slug]);

  return (
   loading? (
   <div>Loading.....</div>
   ) : error? (
   <div>{error}</div>
   ) : (
   <div>
    <Row>
      <Col md={6}>
        <img
        className='img-large'
         src={product.image} 
         alt={product.name}></img>
      </Col>
      <Col md={3}></Col>
      <Col md={3}></Col>
    </Row>
   </div>
   )
  )
}

export default ProductScreen;