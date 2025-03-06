import { useState ,useEffect} from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import React from "react";
import FormContainer from "../components/FormContainer";
import Loader from '../components/Loader'
import {useLoginMutation} from '../slices/userApiSlice'
import {setCredentials} from '../slices/authSlice'
import { toast } from "react-toastify";

//redirection used in proced to checkout button in cartScreen



const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch=useDispatch()
  const navigate =useNavigate()

  const[login,{isLoading}]=useLoginMutation();//When you call the hook (useLoginMutation()), it returns an array with two elements:

  const {userInfo}=useSelector((state)=>state.auth)//getting the userInfo object from authSlice

  const{search}=useLocation()//search is the part of the current url that comes after ?...here "?redirect=/shipping"
  const sp=new URLSearchParams(search)//By passing the search string to URLSearchParams, it creates an object that allows you to easily work with the key-value pairs in the query string.
  const redirect =sp.get('redirect')||'/';//here 'redirect is acting ass key.if redirect has value just redirect to that page if not redirect to home page
  // redirect=shipping

//flow-1
  //if user logged  in already and then going for cart and clicking proceed to check out ,it will automaticaly comes to the page login
  //and since user already logged(userInfo found) in,we dont need to have login scenarios and in order to skiiping that scenario
  //the useEffect is mentioned above the submit scenario,it will handle this
  //and automatically redirects to the page "shipping" 
  useEffect(()=>{
    if(userInfo){
      navigate(redirect) //if user already logged ,we will have user/ifo,so it will redirect to the page 'shipping;
    }
  },[userInfo,redirect,navigate])


  
//while clicking submit
  // flow -2
  // if user placed all order and clicking proceed to checkout,since user havent logged in ,it bring the user to login and get him logged ,
  //by this time url has redirect value "/shippin" then it redirects him to shipping page

  //flow-3
  //if user comes to login straightly,he wouldnt be having redirect key so it will take him to home page once he click the submit button

  const submitHandler = async(e) => {
    e.preventDefault(); //preventing default behabiour of form that is when submitting it automatically sends the data to the server
    try{
      const res=await login({email,password}).unwrap()//from useLoginMutation file
      dispatch(setCredentials({...res,}))
      navigate(redirect)// if user placed all order and clicking proceed to checkout,since user havent logged in it bring the user to login and get him logged ,by this time url has redirect value then it redirects him to shipping page
    }catch(error){
      toast.error(error?.data?.message||error.error)
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>password Address</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
          Sign In
        </Button>
        {isLoading && <Loader/>}

        <Row className="py-3">
          <Col>
          New Customer?<Link to={redirect?`/register?redirect=${redirect}`:'/register'}>Register</Link>
          </Col>
        </Row>
      </Form>
   
    </FormContainer>
  );
};

export default LoginScreen;
