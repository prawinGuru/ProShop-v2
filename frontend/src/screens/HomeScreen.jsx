import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import products from '../products'

const HomeScreen = () => {
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