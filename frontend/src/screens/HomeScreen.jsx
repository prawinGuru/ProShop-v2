// import { useEffect, useState } from "react";
import React from "react";
import { Row, Col } from "react-bootstrap";
// import axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const HomeScreen = () => {
  // const [products, setProducts] = useState([]);

  // // const{data} will destructured the object id form the url
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get("/api/products");
  //     setProducts(data);
  //   };

  //   fetchProducts();
  // }, []); // empty array means --call only on page loads

  // // const{data} will destructured the object id form the url
  // and data is named as product
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <h1>Latest Product</h1>
          <Row>
            {products.map((Object) => (
              <Col key={Object._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={Object} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
