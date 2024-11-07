import React from 'react';
import ReactDOM from 'react-dom/client';

// Router- allows users to navigate from one part of the app to another by changing the URL without reloading the entire page.
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import {Provider} from 'react-redux';
import store from './store.js'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import OrderListScreen from './screens/admin/OrderListScreen.jsx';
import ProductListScreen from './screens/admin/ProductListScreen.jsx';
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx';


// createBrowserRouter: Creates the router and defines the routes for the app.
// uses browser's history API to manage the navigation in your application.
//like pushing and popping entries from the browser history stack
const router = createBrowserRouter(

  //  takes JSX elements and converts them into a route configuration that the router can understand
  createRoutesFromElements(

    // route where the root path '/' renders the App component - acts asmain component
    <Route path='/' element={<App/>}>

      {/*  Nested Route: Tells the router to render the HomeScreen component when the user is at the root (/) URL.*/}
       {/* index={true} - this route should render when the user visits the parent route */}
       {/*  default child route (the one that loads when no other child route matches). */}
<Route index={true} path='/' element={<HomeScreen/>}/>
<Route path='/product/:id' element={<ProductScreen/>}/>
<Route path='/cart' element={<CartScreen/>}/>
<Route path='/login' element={<LoginScreen/>}/>
<Route path='/register' element={<RegisterScreen/>}/>

<Route path='' element={<PrivateRoute />}>
<Route path='/shipping' element={<ShippingScreen/>}/>
<Route path='/payment' element={<PaymentScreen/>}/>
<Route path='/placeorder' element={<PlaceOrderScreen/>}/>
<Route path='/order/:id' element={<OrderScreen/>}/>
<Route path='/profile' element={<ProfileScreen/>}/>
</Route>

<Route path='' element={<AdminRoute />}>
<Route path='/admin/orderlist' element={<OrderListScreen/>}/>
<Route path='/admin/productlist' element={<ProductListScreen/>}/>
<Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
</Route>

</Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store ={store}>
      <PayPalScriptProvider deferLoading={true}>
      <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
