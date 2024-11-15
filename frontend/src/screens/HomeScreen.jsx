// import { useEffect, useState } from "react";
import React from "react";
import { Row, Col } from "react-bootstrap";
// import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import Paginate from "../components/Paginate";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

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
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
        <Meta/>
          <h1>Latest Product</h1>
          <Row>
            {data.products.map((Object) => (
              <Col key={Object._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={Object} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
