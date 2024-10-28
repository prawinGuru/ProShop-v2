import { Badge, Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';

const Header = () => {

  //  to access specific data from the Redux store's state
  // .cart is get from store.js
  // object destructuring
  const {cartItems} = useSelector((state) => state.cart);
  console.log(cartItems);

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
<Container>
  <LinkContainer to="/">
    <Navbar.Brand>
    <img src={logo} alt='ProShop'/>
    ProShop
    </Navbar.Brand>
    </LinkContainer>

    {/* Generates hamburger menu when navbar is in collapsed state */}
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>

    {/* Wraps the collapsible part */}
    <Navbar.Collapse id="basic-navbar-nav">
        
        <Nav className="ms-auto">
            {/* Nav item with nav link and nav icon */}
            <LinkContainer to="/cart">
<Nav.Link>
  <FaShoppingCart /> Cart
{
  cartItems.length > 0 && (
    <Badge pill bg='info' style={{marginLeft: '7px'}}>
{cartItems.reduce((acc, currentItem) => acc + currentItem.qty, 0)}
    </Badge>
  )
}
</Nav.Link>
</LinkContainer>

<LinkContainer to="/login">
<Nav.Link><FaUser/> Sign In</Nav.Link>
</LinkContainer>
        </Nav>
    </Navbar.Collapse>
</Container>
        </Navbar>
    </header>
  )
}

export default Header