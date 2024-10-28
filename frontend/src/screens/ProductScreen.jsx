import React from 'react'
// useParams() hook to capture the id from the URL
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message.jsx';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice.js';

const ProductScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
const [qty, setQty] = useState(1);

    // destructures the id from object returned and assigns the value to new variable productId
    const {id:productId} = useParams();
const {data: product, isLoading, error} = useGetProductDetailsQuery(productId);
    
    console.log(product);

    const addToCartHandler = () => {

        // used to send an action to the Redux store. The action updates the store's state
        // The product details is send in array form, combines the product properties with qty
dispatch(addToCart({...product, qty}));
navigate('/cart');
    }

  return (
    <>
    <Link className='btn btn-light my-3' to='/'>Go Back</Link>
    
    {isLoading ? (
        <Loader/>
    ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
    ) : (
        
        <Row>
        <Col md={5}>
        {/* fluid - prop, to get responsive image allowing to scale with parent container */}
        <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={4}>
        <ListGroup variant='flush'>
    <ListGroup.Item>
        <h3>{product.name}</h3>
    </ListGroup.Item>

    <ListGroup.Item>
        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
    </ListGroup.Item>
    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
    <ListGroup.Item>Description: {product.description}</ListGroup.Item>
</ListGroup>
        </Col>

        <Col md={3}>
        <Card>
            <ListGroup variant='flush'>
<ListGroup.Item>
    <Row>
        <Col>Price:</Col>
        <Col>
        <strong>${product.price}</strong>
        </Col>
    </Row>
</ListGroup.Item>

<ListGroup.Item>
    <Row>
        <Col>Status:</Col>
        <Col>
        <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
        </Col>
    </Row>
</ListGroup.Item>

{/* shows dropdown only if countInStock is > 0 */}
{product.countInStock > 0 && (
    <ListGroup.Item>
        <Row>
            <Col>Qty</Col>
            <Col>
            {/* Renders a dropdown */}
            <Form.Control
            as='select'

            // Set the value of dropdown in box
value={qty}

//Updates qty whenever user selects new qty
onChange={(e) => setQty(Number(e.target.value))}>

    {/* generates an array of options for the dropdown based on stock quantity */}
    {[...Array(product.countInStock).keys().map((x) => (
        <option key={x + 1} value={x + 1}>
{x + 1}
        </option>
    ))]}
</Form.Control>
            </Col>
        </Row>
    </ListGroup.Item>
)}

<ListGroup.Item>
    <Button className='btn-block' type='button' 
    disabled={product.countInStock === 0}
    onClick={addToCartHandler}
    >
        Add To Cart
    </Button>
</ListGroup.Item>
            </ListGroup>
        </Card>
        </Col>
    </Row>
    )
}
    
    </>
  )
}

export default ProductScreen