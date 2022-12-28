import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';


function Product(props) {
    const {product}= props;
  return (
      <Card className="product" key={product.slug}>
      <Link to={`/product/${product.slug}`}>
     <img src={product.image} className="card-img-tap" alt={product.name}/>
     </Link>
     <Card.Body>
     <Link to={`/product/${product.slug}`}>
     <Card.Title> {product.name}</Card.Title>
     </Link>
     <Rating rating={product.rating} numReviews={product.numReviews}/>
     <Card.Text> <strong>${product.price}</strong></Card.Text>
     <Button className='btn-primary'>Add To Cart</Button>
     </Card.Body>
     </Card>
  )
}

export default Product;