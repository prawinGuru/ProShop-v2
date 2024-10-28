import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useGetProductsQuery } from '../slices/productsApiSlice'

const HomeScreen = () => {

  // Destructures the result of useGetProductsQuery() into three variables:
  // data: products - Renames data to products
  // isLoading: Boolean indicating if the request is still loading.
// error: Holds error information if the API call fails.
const {data: products, isLoading, error} = useGetProductsQuery();
  return (
    <>
    {isLoading ? (
      <Loader/>
    ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
    ) : (<>
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
    </>)
    }
    
    </>
  )
}

export default HomeScreen