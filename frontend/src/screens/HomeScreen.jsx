import React from 'react'
import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const {data} = await axios.get('/api/products');
      setProducts(data)
    };

    fetchProducts();
  }, []);
  return (
    <>
    <h1>Latest Products</h1>
    <Row>
        {products.map((Object) => (
            // in small screen it takes 12 units (1 row), medium - 6 units (2 rows), large - 4 units (3 rows), extra large screens- 3 units (4 rows)
            <Col key= {Object._id}sm={12} md={6} lg={4} xl={3}>

                {/* passing an object as a prop named product  */}
                <Product product={Object} />
            </Col>
        ))}
    </Row>
    </>
  )
}

export default HomeScreen