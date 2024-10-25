import React from 'react'
import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios';

const HomeScreen = () => {

  // [state, function (used to update the state when data is fetched)]
  // initailised as empty array
  const [products, setProducts] = useState([]);

  // perform action after the component renders
  useEffect(() => {
    const fetchProducts = async () => {

      // no need to put the whole URL (http://localhost:5000) it gets from proxy
      // extract only data from response
      const {data} = await axios.get('/api/products');

      //set in products state using setProduct function
      setProducts(data)
    };

    // runs only once when the component renders first
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